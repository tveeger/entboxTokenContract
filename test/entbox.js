const EntboxContract = artifacts.require("./EntboxContract.sol");

contract('EntboxContract', function(accounts) {

    const account0 = accounts[0];
    const storedDets = 22;
    const storedEuro = 31;
    const id = "abcdef";

    it("should have sane initial values", function () {
        let detsContract;
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, account0, storedDets, storedEuro, {from:accounts[0]})
        }).then(function() {
            return detsContract.getTotalDetsAmount.call();
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),0,"initially totalDetsAmount should be 0!");
        });
    });

    it("should allow to store a receipt", function () {
        let detsContract;
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, account0, storedDets, storedEuro, {from:accounts[0]})
        }).then(function() {
            return detsContract.getDetsAmountFromReceipt.call(id);
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),storedDets,"detsAmount not stored correctly!");
        }).then(function() {
            return detsContract.getEuroAmountFromReceipt.call(id);
        }).then(function(euroAmount){
            assert.equal(euroAmount.toNumber(),storedEuro,"euroAmount not stored correctly!");
        }).then(function() {
            return detsContract.getTokenCreatorFromReceipt.call(id);
        }).then(function(tokenCreator){
            assert.equal(tokenCreator,account0,"tokenCreator not stored correctly!");
        }).then(function() {
            return detsContract.getTokenCreatedStatusFromReceipt.call(id);
        }).then(function(tokenCreatedStatus){
            assert.equal(tokenCreatedStatus,false,"tokenCreatedStatus should be false after storing receipt!");
        });
    });

    it("should fail to getDetsAmountFromReceipt for unknown receipt id", function () {
        let detsContract;
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, account0, storedDets, storedEuro,{from:accounts[0]})
        }).then(function() {
            return detsContract.getDetsAmountFromReceipt.call("wrongId");
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),0,"there is a detsAmount for some wrong id!");
        }).then(function() {
            return detsContract.getEuroAmountFromReceipt.call("wrongid");
        }).then(function(euroAmount){
            assert.equal(euroAmount.toNumber(),0,"there is a euroAmount for a wrong id!");
        }).then(function() {
            return detsContract.getTokenCreatorFromReceipt.call("wrongId");
        }).then(function(tokenCreator){
            assert.equal(tokenCreator,0,"there is a tokenCreator for some made up id!");
        });
    });

    it("should allow storeReceipt call only from owner account", function () {
        let detsContract;
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, account0, storedDets, storedEuro, {from:accounts[2]})
        }).then(function() {
            console.log("this should not log! only owner should be allowed to call storeReceipt!");
            assert.equal(true,false,"only owner should be allowed to call storeReceipt!");
        }).catch(function(error){
            //console.log("failed as expected: only owner should be allowed to call storeReceipt! "+error);
        });
    });

    it("should allow to create Dets", function () {
        let detsContract;
        let account4 = accounts[4];
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, account4, storedDets, storedEuro, {from:accounts[0]})
        }).then(function() {
            return detsContract.getDetsBalance.call(account4);
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),0,"before createDets balance should be 0!");
        }).then(function() {
            return detsContract.createDets(id);
        }).then(function() {
            return detsContract.getDetsBalance.call(account4);
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),storedDets,"Dets not created correctly!");
        }).then(function() {
            return detsContract.getTokenCreatedStatusFromReceipt.call(id);
        }).then(function(tokenCreatedStatus){
            assert.equal(tokenCreatedStatus,true,"tokenCreatedStatus should be true after creating tokens!");
        }).then(function() {
            return detsContract.createDets(id);
        }).then(function(){
            console.log("this should not log! second call to createDets with same id should throw!");
            assert.equal(1,0,"second call to createDets with same id should throw!");
        }).catch(function(e){
            if (!isThrowFromTestRPC(e)) throw(e);
            //console.log("failed as expected: second call to createDets with same id should throw! "+error);
        });
    });

    function isThrowFromTestRPC(e) {
        if ((e + "").indexOf("invalid JUMP") || (e + "").indexOf("out of gas") > -1) {
            return true;
        }
        throw(e);
    }

    it("should allow to destroy Dets", function () {
        let detsContract;
        let userAccount = accounts[5];
        let destroyId = "35gafte";
        let detsToDestroy = 5;
        let iban = "NL56INGB5936834";
        return EntboxContract.deployed().then(function(instance) {
            detsContract = instance;
            return detsContract.storeReceipt(id, userAccount, storedDets, storedEuro, {from:accounts[0]});
        }).then(function() {
            return detsContract.createDets(id, {from:userAccount});
        }).then(function() {
            return detsContract.getDetsBalance.call(userAccount);
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),detsAmount,"create Dets went wrong!");
        }).then(function() {
            return detsContract.destroyDets(destroyId, detsToDestroy, iban, {from:userAccount});
        }).then(function() {
            return detsContract.getDetsBalance.call(userAccount);
        }).then(function(detsAmount){
            assert.equal(detsAmount.toNumber(),storedDets-detsToDestroy,"dets not destroyed correctly!");
        }).then(function() {
            return detsContract.destroyDets(destroyId, detsToDestroy, iban, {from:userAccount});
        }).then(function(){
            return detsContract.getDetsBalance.call(userAccount);
        }).then(function(detsAmount) {
            console.log("using same id again for destruction should lead to throw!");
            assert.equal(true,false,"using same id again for destruction should lead to throw!");
        }).catch(function(e) {
            if(!isThrowFromTestRPC(e)) throw(e);
            //console.log("failed as expected: using same id again for destruction should lead to throw!");
        }).then(function(){
            return detsContract.destroyDets(destroyId+"2", 999, iban, {from:userAccount});
        }).then(function(){
            return detsContract.getDetsBalance.call(userAccount);
        }).then(function(detsAmount) {
            console.log("attempt to destroy more Dets than on account avail should lead to throw!");
            assert.equal(true,false,"attempt to destroy more Dets than on account avail should lead to throw!");
        }).catch(function() {
            console.log("failed as expected: attempt to destroy more Dets than on account avail should lead to throw!");
            // failed as expected
        }).then(function(){
            return detsContract.destroyDets(destroyId+"3", 0, iban, {from:userAccount});
        }).then(function(){
            return detsContract.getDetsBalance.call(userAccount);
        }).then(function(detsAmount) {
            console.log("destroying 0 Dets should lead to throw!");
            assert.equal(true,false,"destroying 0 Dets should lead to throw!");
        }).catch(function(e) {
            if(!isThrowFromTestRPC(e)) throw(e);
            //console.log("failed as expected: destroying 0 Dets should lead to throw!");
        })
            ;
    });


    //
});