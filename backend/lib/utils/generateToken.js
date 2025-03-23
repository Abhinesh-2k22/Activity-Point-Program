import jwt from 'jsonwebtoken';

export const generateTokenandSetCookie = (user,res) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, { 
         maxage: 15 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: false,       
         sameSite: 'Lax',
    });
    
    
    return token;
}
