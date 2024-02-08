
exports.isLogedIn = async (req, res, next) => {

    // we need to see weather the user is loged in or not

    if (req.cookies.jwt) {
        try {
            if (req.cookies.jwt == 'logout') {
                return next();
            }




            // we need to get the id from the token which we have encoded 
            let decode = jwt.decode(req.cookies.jwt, process.env.JWT_SECRET_KEY)
            let currentUser = await User.findById(decode.id);

            if (!currentUser) {
                return next()
            }

            // we need to check weater the password is changed or not 
            if (currentUser.IsPasswordChanged(decode.iat)) {
                return next()
            }


            // to get the data into the template 
            // console.log(currentUser);
            res.locals.user = currentUser;
            // req.userE = currentUser;
            // console.log("finnnnnnnn");
            return next();

        } catch (error) {
            console.log(error);
            return next()
        }
    }

    next();
}