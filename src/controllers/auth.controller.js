

export const register = async (req,res)=>{
    try{
        res.send("hello register api")
    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const login = async (req,res)=>{
    try{

    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const logout = async (req,res)=>{
    try{

    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const refreshToken = async (req,res)=>{
    try{

    }catch (err){
        res.status(500).json({message : err.message})
    }
}
