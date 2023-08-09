import { Request, Response } from "express";
import User from "../database/User";

class UserController {


  async delete(request: Request, response: Response) {
    const { id } = request.params;  // Pegando o ID do usuário da URL

    try {
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found",
            });
        }

        await user.deleteOne();

        return response.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        return response.status(500).json({
            error: "Deletion failed",
            messsage: error,
        });
    }
}


    async find(request: Request, response: Response) {
       try {
        const users = await User.find();
        return response.json(users)

    } catch (error) {
        return response.status(500).json({
            error: "Error",
            messsage: error,
        });
     }
    }
    
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
     
      try {
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return response.status(400).json({  
              error:"OOOOPS",
              message: "User already exists",
            });
        }
        
        const user = await User.create({ 
          name, 
          email, 
          password });
        
        return response.json(user);
      } catch (error) {
        return response.status(500).json({
            error: "Registration failed",
            messsage: error,
        });
      }
    }
}

export default new UserController();

     
    