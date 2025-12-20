import { authModel } from "./auth.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config/index.js";
const register = async(payload) =>{
    console.log(payload)
    const result = await authModel.create(payload)
     const user = result.toObject();
     user.password;
    return user;
}

const login = async(payload) =>{
  const user = await authModel.findOne({email: payload?.email}).select("+password")
    // console.log({user})
     if (!user) {
        throw new Error("this is user error")
     }
     const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password)

     if (!isPasswordMatch) {
        throw new Error("password is wrong")
     }
    
     const accessToken = jwt.sign({email: user?.email, role: user?.role}, config.jwt_access_secret , {expiresIn : "2d"})

     const reFreshToken = jwt.sign({email: user?.email, role: user?.role}, config.jwt_refresh_secret , {expiresIn : "30d"})

     const accessUser = {name : user?.name, email: user?.email, role: user?.role}
     return {  accessUser, accessToken, reFreshToken}

}

export const authService ={
register,
login
}