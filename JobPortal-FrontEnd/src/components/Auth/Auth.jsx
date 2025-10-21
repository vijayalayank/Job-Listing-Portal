import { useState } from "react";
import style from "./Auth.module.css"



function Register(){
    let currentDate = new Date();
let currentYear = currentDate.getFullYear();
console.log(currentYear);

    const [usertype,setusertype] = useState('');
    const [current,setcurrent] = useState(false);
    const [formdata,setFormData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        phonenumber:"",
        password:"",
        confirmpassword:"",
        eduLevel:"",
        passingout:currentYear,
        cname:"",
        cweb:"",
        cindustry:"",
        cdes:""
    });

   const handleChange = (e) => {
    
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files[0]
  }));
};


  function handleSubmit(e){
    e.preventDefault();

  }

    return(<>
        <div className={style.contain}>
            <form onSubmit={handleSubmit}>
            <div className={style.type}>
                
                    <select
                    value={usertype}
                    onChange={(e) => setusertype(e.target.value)}
                    required
                    >
                    <option value="">Select User Type</option>
                    <option value="Job seeker">Job seeker</option>
                    <option value="Employer">Employer</option>
                    </select>
            </div>
            <div className={style.name}>
                <div className={style.first}>
                    <p>First Name*</p>
                    <input type="text" name="firstname" value={formdata.firstname} onChange={handleChange} required/>
                </div>
                <div className={style.last}>
                    <p>Last Name*</p>
                    <input type="text" name="lastname" value={formdata.lastname} onChange={handleChange} required/>
                </div>
            </div>
            <div className={style.mailid}>
                <p>E-mail ID*</p>
                <input type="email" name="email" value={formdata.email} onChange={handleChange} required/>
            </div>
             <div className={style.number}>
                <p>Phone Number*</p>
                <input type="number" name="phonenumber" value={formdata.phonenumber} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" required/>
            </div>
            {usertype==='Job seeker' && 
            <div>
                <div className={style.resume}>
                    <p>Upload Resume (Optional)</p>
                    <input type="file" name="resume" onChange={handleFileChange}/>
                </div>
                <div className={style.photo}>
                    <p>Upload Profile Picture(Optional)</p>
                    <input type="file" name="profilePicture" onChange={handleFileChange}/>
                </div>
                <div className={style.edu}>
                    <p>Education Level* (B Tech , BBA , MBA ,...)</p>
                    <input type="text"   name="eduLevel"
                        value={formdata.eduLevel}
                        onChange={handleChange}/><br />
                      <input type="checkbox" onChange={()=>{setcurrent(!current)}}/>
                    Currently pursuing
                    {
                    current && 
                         <select>
                            {[...Array(21)].map((_, i) => (
                            <option key={i} value={i}>
                                {currentYear+i}
                            </option>
                            ))}
                        </select>
                                                
                    }
                  
                </div>
            </div>
            }
            {usertype==='Employer' && 
            <div>
                <div className={style.company}>
                    <p>Company Name*</p>
                    <input type="text" name="cname" value={formdata.cname} onChange={handleChange} required/>
                </div>
                <div className={style.logo}>
                    <p>Logo (optional)</p>
                    <input type="file" name="clogo" onChange={handleFileChange}/>
                </div>
                <div className={style.site}>
                    <p>Company website (optional)</p>
                    <input type="text" name="cweb"  value={formdata.cweb} onChange={handleChange} />
                </div>
                <div className={style.industry}>
                    <p>Industry Type* (Ex:IT, Healthcare, Education, etc...)</p>
                    <input type="text" name="cindustry"  value={formdata.cindustry} onChange={handleChange} required/>
                </div>
                <div className={style.description}>
                    <p>Company description (optional)</p>
                    <textarea name="cdes"  value={formdata.cdes} onChange={handleChange}>
                        About Us
                    </textarea>
                </div>
            </div>
            }

            <div className={style.password}>
                <p>Password*</p>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} required />
            </div>
            <div className={style.confirm}>
                <p>Confirm Password*</p>
                <input type="password" name="confirmpassword" value={formdata.confirmpassword} onChange={handleChange} required />
            </div>

            <input type="submit" />
            </form>
        </div>
    </>)    
}


export {Register};