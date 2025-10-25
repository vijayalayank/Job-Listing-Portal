export const errorHandling = (error,req,res,next) => {
        console.log("Error : ",error.message);
        res.status(error.status || 500).json(
            {
                success : false,
                message : error.message ||"server error",
            }
        )
        
}