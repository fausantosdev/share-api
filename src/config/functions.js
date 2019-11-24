
module.exports = {
    
    makeHash(tm){
        var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        var random = ''
        for (var i = 0; i < tm; i++) {
            var rnum = Math.floor(Math.random() * characters.length)
            random += characters.substring(rnum, rnum + 1)
        }
        return random
    },

    teste(){
        console.log("Oxe!")
    }

}