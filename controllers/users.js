module.exports = {
    signUp: async (req, res, next) => {
        console.log('UserController.signUp() called!');
    },
    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called!');
    },

    secret: async(req, res ,next) =>{
        console.log('UserController.secret() called!');
    }

}