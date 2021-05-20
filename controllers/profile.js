//to access private data after logIn
const User = require("./../models/User");
const ErrorResponse = require("./../utility/errorResponse");

exports.getPrivateData = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    //sending error
    return next(new ErrorResponse("No userID mentioned", 400));
  }

  let user;

  try {
    user = await User.findOne({ "_id":id }).populate('-password');

    if (!user) {
        //sending error
        return next(
          new ErrorResponse("user does not exist", 401)
        );
    }

  } catch (error) {
    //sending error
    next(error);
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateProfile = async (req, res, next) => {
    const {_id,feild,value} = req.body;

    
  
    if (!feild||!_id) {
      //sending error
      return next(new ErrorResponse("unsufficient credentials", 400))
    }
  
  
    try {

      
        if(feild=="username"){
          await User.updateOne({_id},{
            $set:{
              username:value
    
            }
          });
        }
  
        if(feild=="email"){
          await User.updateOne({_id},{
            $set:{
              email:value
    
            }
          });
        }
  
        if(feild=="address"){
          await User.updateOne({_id},{
            $set:{
              address:value
            }
          });
        }

  

  
    } catch (error) {
      //sending error
      next(error);
    }
  
    res.status(200).json({
      success: true,
       data:"Profile Updated successfully",
    });
  };

  exports.deleteFeild = async (req, res, next) => {
    const {feild, _id} = req.body;
    
    if (!feild) {
      //sending error
      return next(new ErrorResponse("No feild mentioned", 400));
    }
  
    
  
    try {
      if(feild=="username"){
        await User.updateOne({_id},{
          $unset:
        {username:1}
        });
      }

      if(feild=="email"){
        await User.updateOne({_id},{
          $unset:
        {email:1}
        });
      }

      if(feild=="address"){
        await User.updateOne({_id},{
          $unset:
        {address:1}
        });
      }
  
    } catch (error) {
      //sending error
      next(error);
    }
  
    res.json({
      success: true,
       data:"Feild Deleted Successfully",
    });
  };