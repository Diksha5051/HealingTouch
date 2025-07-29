var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql2");
var app = express();
app.listen(2010, function () {
      console.log("server started..");
})
app.use(express.static("public"));
app.use(fileuploader());
app.use(express.urlencoded(true));
app.get("/profiles", function (req, resp) {
      resp.sendFile(process.cwd() + "/project/profile.html");
})
var dbConfig = {
      host: "127.0.0.1",
      user: "root",
      password: "D2003@Ik//*",
      database: "project",
      dateStrings: true
}
var dbCon = mysql.createConnection(dbConfig);
dbCon.connect(function (jasoos) {
      if (jasoos == null)
            console.log("connected successfully**");
      else
            console.log(jasoos);
            
})
////*****************************************index************************************** */
app.get("/", function (req, resp) {

      resp.sendFile(process.cwd() + "/project/index.html")
})
//***********************************************************profile*************************************************************** */
app.post("/profile-submit", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.txtEmail;
      var name = req.body.txtName;
      var phoneno = req.body.txtNumber;
      var address = req.body.txtAddress;
      var city = req.body.txtCity;
      var dob = req.body.txtBirth;
      var gender = req.body.txtGender;
      var proof = req.body.txtProof;

      dbCon.query("insert into proffile(email,name,phoneno,address,city,dob,gender,proof,picname) values(?,?,?,?,?,?,?,?,?)", [email, name, phoneno, address, city, dob, gender, proof, fileName], function (err) {
            if (err == null)
                  resp.send("record saved successfully");
            else
                  resp.send(err);
      })
})
app.post("/profile-update", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.txtEmail;
      var name = req.body.txtName;
      var phoneno = req.body.txtNumber;
      var address = req.body.txtAddress;
      var city = req.body.txtCity;
      var dob = req.body.txtBirth;
      var gender = req.body.txtGender;
      var proof = req.body.txtProof;

      dbCon.query("update proffile set name=?,phoneno=?,address=?,city=?,dob=?,gender=?,proof=?,picname=? where email=?", [name, phoneno, address, city, dob, gender, proof, fileName, email], function (err) {
            if (err == null)
                  resp.send("record update successfully");
            else
                  resp.send(err);
      })
})

app.get("/get-json-record", function (req, resp) {
      //fixed                             //same seq. as in table
      dbCon.query("select * from proffile where email=?", [req.query.kuchEmail], function (err, resultTableJSON) {
            if (err == null)
                  // console.log("profile exist")
                  resp.send(resultTableJSON);
            // resp.send("profile exist");
            else
                  resp.send(err);
      })
})
//*********************************************************** do-signup***********************************************************/


app.get("/chk-submit", function (req, resp) {
      // console.log("run");
      dbCon.query("insert into users(email,pwd,type,dos,status) values(?,?,?,current_date(),1)", [req.query.kuchemail, req.query.kuchpwd, req.query.kuchtype], function (err) {
            if (err == null) {
                  // console.log("run");
                  resp.send("Record Saved successfully");
            }
            else {
                  resp.send(err);
            }
      })

})

app.get("/chk-txtemail", function (req, resp) {

      dbCon.query("select * from user where email=?", [req.query.kuchEmail], function (err, resultTable) {
            if (err == null) {
                  if (resultTable.length == 1)
                        resp.send("already taken");
                  else
                        resp.send("available...//");
            }
            else
                  resp.send(err);


      })
})
//********************************************************do login */***************************************************************** */
app.get("/chk-login", function (req, resp) {
      // console.log("yum");
      var email = req.query.kuchEmaill;
      var password = req.query.kuchPwdl;
      dbCon.query("select type,status from users where email=? and pwd=?", [email, password], function (err, resultTable) {
            // console.log("yum");
            if (err == null) {
                  if (resultTable.length == 1) {
                        if (resultTable[0].status == 1)
                              //resp.send("tum");


                              return resp.send(resultTable[0].type);


                        else
                              return resp.send("you are blocked");
                  }
                  else
                        console.log("invalid..");
                  return resp.send("Invalid User Id/Password");
            }
            else {
                  return resp.send(err.toString());
            }
      })
})
//**************************************************donor submit & donor update***************************************************** */
app.get("/chk-email",function(req,resp)
{
     //saving data in table
    
    
         //fixed                             //same seq. as in table
    dbCon.query("select * from users where email=?",[req.query.kuchEmail],function(err,resultTable)
    {
          if(err==null)
          {
            if(resultTable.length==1)
              resp.send("Already Taken...");
            else
              resp.send("Available....!!!!");
            }
              else
            resp.send(err);
    })
})

app.post("/profile-submitdonor", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.txtEmail;
      var name = req.body.txtName;
      var phoneno = req.body.txtNumber;
      var address = req.body.txtAddress;
      var city = req.body.txtCity;
      var avala = req.body.txtTimea;
      var avalp = req.body.txtTimep;
      var gender = req.body.txtGender;
      var proof = req.body.txtProof;

      dbCon.query("insert into donorprofile(email,name,phoneno,address,city,avalfrom,till,gender,proof,picname) values(?,?,?,?,?,?,?,?,?,?)", [email, name, phoneno, address, city, avala, avalp, gender, proof, fileName], function (err) {
            if (err == null)
                  resp.send("record saved successfully");
            else
                  resp.send(err);
      })
})
app.post("/profile-updatedonor", function (req, resp) {

      var fileName;
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      else {
            fileName = req.body.hdn;
      }
      resp.send("File name="+fileName);
      console.log(req.body);
      var email = req.body.txtEmail;
      var name = req.body.txtName;
      var phoneno = req.body.txtNumber;
      var address = req.body.txtAddress;
      var city = req.body.txtCity;
      var avala = req.body.txtTimea;
      var avalp = req.body.txtTimep;
      var gender = req.body.txtGender;
      var proof = req.body.txtProof;

      dbCon.query("update donorprofile set name=?,phoneno=?,address=?,city=?,avalfrom=?,till=?,gender=?,proof=?,picname=? where email=?", [name, phoneno, address, city, avala, avalp, gender, proof, fileName, email], function (err) {
            if (err == null)
                  resp.send("record update successfully");
            else
                  resp.send(err);
      })
})
app.get("/do-search", function (req, resp) {
      //fixed                             //same seq. as in table
      dbCon.query("select * from donorprofile where email=?", [req.query.kuchEmail], function (err, resultTableJSON) {
            if (err == null)
                  // console.log("profile exist")
                  resp.send(resultTableJSON);
            // resp.send("profile exist");
            else
                  resp.send(err);
      })
})
//***********************************************avail medicine *************************************************************************************/

app.get("/availmed-submit", function (req, resp) {
      console.log(req.body);
      dbCon.query("insert into availmed(email,med,expdate,packing,qty) values(?,?,?,?,?)", [req.query.kuchemail, req.query.kuchmed, req.query.kuchexpiry, req.query.kuchpacking, req.query.kuchquantity], function (err) {
            if (err == null) {
                  //   console.log("run");
                  resp.send("Record Saved successfully");
            }
            else {
                  resp.send(err);
            }
      })

})
//***************************************************  settings donor ************************************************************************ */


app.get("/chk-settings", function (req, resp) {
      // console.log("run");
      var oldPwd = req.query.kucholdpwd;
      var confirmPwd = req.query.kuchcurrentpwd;
      var newPwd = req.query.kuchnewpwd;
      var email = req.query.kuchemail;



      console.log(req.body);

      // Check if the new password and confirm password match
      if (newPwd !== confirmPwd) {
            resp.send("New password and confirm password do not match");
            return;
      }

      // Query the database to fetch the user's current password
      dbCon.query("SELECT pwd FROM users WHERE email = ?", [email], function (err, result) {
            if (err) {
                  console.error('Error executing SQL query:', err);
                  resp.send("Error executing SQL query");
                  return;
            }

            // Check if the user exists and the old password matches
            if (result.length === 0) {
                  resp.send('User not found');
                  return;
            }

            var dbPwd = result[0].pwd;

            if (oldPwd !== dbPwd) {
                  resp.send('Incorrect old password');
                  return;
            }
            if (dbPwd == newPwd) {
                  resp.send("Old Password and New Password Can,t be same!!");
                  return;
            }

            // Update the password in the database
            dbCon.query("UPDATE users SET pwd= ? WHERE email = ?", [newPwd, email], function (err) {
                  if (err) {
                        console.error('Error updating password:', err);
                        resp.status(500).send('Error updating password');
                        return;
                  }

                  resp.send("Password updated successfully!");
            });
      });
});



//**********************************************profile needy********************************************************************* */
app.post("/profile-needysubmit", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.inputEmail;
      var name = req.body.inputName;
      var phoneno = req.body.inputNum;
      var address = req.body.inputAddress;
      var dob = req.body.inputDob;
      var city = req.body.inputCity;
      var gender = req.body.inputGender;
      dbCon.query("insert into needyprofile(email,name,phoneno,address,city,dob,gender,picname) values(?,?,?,?,?,?,?,?)", [email, name, phoneno, address, city, dob, gender, fileName], function (err) {

            if (err == null)
                  //  console.log("hii");
                  resp.send("record saved successfully");
            else
                  resp.send(err);
      })


})



app.post("/profile-needyupdate", function (req, resp) {

      var fileName;
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      else {
            fileName = req.body.hdn;
      }
      console.log(req.body);
      var email = req.body.inputEmail;
      var name = req.body.inputName;
      var phoneno = req.body.inputNum;
      var address = req.body.inputAddress;
      var dob = req.body.inputDob;
      var city = req.body.inputCity;
      var gender = req.body.inputGender;

      dbCon.query("update needyprofile set name=?,phoneno=?,address=?,city=?,dob=?,gender=?,picname=? where email=?", [name, phoneno, address, city, dob, gender, fileName, email], function (err) {
            if (err == null)
                  resp.send("record update successfully");
            else
                  resp.send(err);
      })
})



app.get("/do-needysign", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);


      dbCon.query("insert into needyprofile(email,name,phoneno,address,city,dob,gender,picname) values(?,?,?,?,?,?,?,?)", [req.body.kuchEmail, req.body.kuchName, req.body.kuchPhone, req.body.kuchaddress, req.body.kuchcity, req.body.kuchbirth, req.body.kuchgender, req.body.kuchpic], function (err) {
            if (err == null)
                  //        console.log("hii");
                  resp.send("profile saved successfully");
            else
                  resp.send(err);
      })
})




app.get("/do-fetch", function (req, resp) {
      //fixed                             //same seq. as in table
      dbCon.query("select * from needyprofile where email=?", [req.query.kuchEmail], function (err, resultTableJSON) {
            if (err == null)
                  //  console.log("profile exist")
                  resp.send(resultTableJSON);
            // resp.send("profile exist");
            else
                  resp.send(err);
      })
})
//*******************************admin-user************************************* */
app.get("/admin", function (req, resp) {

      resp.sendFile(process.cwd() + "/public/admin.html")
})

app.get("/get-user-all-records", function (req, resp) {
      // console.log("run");
      dbCon.query("select * from users", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})

app.get("/get-block", function (req, resp) {
      //saving data in table
      var email = req.query.emailkuch;


      //fixed                             //same seq. as in table
      dbCon.query("update users set status=0 where email=?", [email], function (err, result) {
            if (err == null) {
                  if (result.affectedRows == 1)
                        resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");

                  else
                        resp.send("Inavlid Email id");
            }
            else
                  resp.send(err);
      })
})

app.get("/get-resume", function (req, resp) {
      //saving data in table
      var email = req.query.emailkuch;


      //fixed                             //same seq. as in table
      dbCon.query("update users set status=1 where email=?", [email], function (err, result) {
            if (err == null) {
                  if (result.affectedRows == 1)
                        resp.send("Account unblock");

                  else
                        resp.send("Inavlid Email id");
            }
            else
                  resp.send(err);
      })
})
///*********************needy records********************************** */
app.get("/get-needy-all-records", function (req, resp) {
      // console.log("run");
      dbCon.query("select * from needyprofile", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})
///*********************donor records********************************** */
app.get("/get-donor-fetch", function (req, resp) {
      // console.log("run");
      dbCon.query("select * from donorprofile", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})
///***************************medicine manager in donor dashboard **************/
app.get("/hum", function (req, resp) {

      resp.sendFile(process.cwd() + "/public/med-manager.html")
})

app.get("/get-angular-data", function (req, resp) {
     
      var id=req.query.emailid;
      dbCon.query("select * from availmed where email=?",[id],function (err,resultTableJSON) {
           if (err==null)

                   {     resp.send(resultTableJSON);}
                       
            
                    else
                    
        {    resp.send(err);}
                    
      })
})

app.get("/get-unavail", function (req, resp) {
      //saving data in table
      var sno = req.query.serialno;


      //fixed                             //same seq. as in table
      dbCon.query("delete from availmed where srno=?", [sno], function (err, result) {
            if (err == null) {
                  if (result.affectedRows == 1)
                        resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");

                  else
                        resp.send("Inavlid Email id");
            }
            else
                  resp.send(err);
      })
})


//**********************fetch medicine and fetch cities ************************************/
app.get("/tum", function (req, resp) {

      resp.sendFile(process.cwd() + "/public/finder-manager.html")
})

app.get("/get-donor-fetchcities", function (req, resp) {
      // console.log("run"); 
      dbCon.query("select city from donorprofile", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})

app.get("/get-donor-fetchmeds", function (req, resp) {
      // console.log("run"); 
      dbCon.query("select med from availmed", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})


app.get("/fetch-donors",function(req,resp)
{
      
  console.log(req.query);
  var med=req.query.medKuch;
  var city=req.query.cityKuch;

  var query="select donorprofile.name,donorprofile.proof,donorprofile.phoneno,donorprofile.avalfrom,donorprofile.till ,donorprofile.address,donorprofile.city,availmed.med from donorprofile  inner join availmed on donorprofile.email= availmed.email where availmed.med=? and donorprofile.city=?";
  

  dbCon.query(query,[med,city],function(err,resultTable)
  {
    console.log(resultTable+"      "+err);
  if(err==null)
    resp.send(resultTable);
  else
    resp.send(err);
  })
})



app.get("/get-donor-fetchdetails", function (req, resp) {
      // console.log("run"); 
      dbCon.query("select * from donorprofile", function (err, resultTableJSON) {
            if (err == null) {
                  resp.send(resultTableJSON);
            }
            else {
                  resp.send(err);
            }
      })

})
//***********************************admin remove expire medicines**************************************************** */
app.get("/removeexpire", function (req, resp) {

      
    //  console.log("ji");
     // resp.send("ohh");
      

      dbCon.query("delete from availmed where expdate <= current_date() ", function (err) {
            if (err == null)
                  resp.send("expire medicine deleted");
            else
                  resp.send(err);
      })
})
//*****************************vishal needy profile********************************************** */
app.get("/j", function (req, resp) {

      resp.sendFile(process.cwd() + "/public/k.html")
})

app.get("/get-json-record-needy",function(req,resp)
{
  console.log(req.query);
         //fixed                             //same seq. as in table
         dbCon.query("select * from needyprofile where email=?", [req.query.kuchEmail], function (err, resultTableJSON)
    {
        // console.log(respJSONKuch) ;
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
            // alert(JSON.stringify(err));
    })
})

app.post("/proffile-needysubmit", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.inputEmail4;
      var name = req.body.inputname;
      var phoneno = req.body.inputcontact;
      var address = req.body.inputAddress;
      var dob = req.body.inputDob;
      var city = req.body.inputCity;
      var gender = req.body.inputGender;
      dbCon.query("insert into needyprofile(email,name,phoneno,address,city,dob,gender,picname) values(?,?,?,?,?,?,?,?)", [email, name, phoneno, address, city, dob, gender, fileName], function (err) {

            if (err == null)
                  //  console.log("hii");
                  resp.send("record saved successfully");
            else
                  resp.send(err);
      })


})

app.post("/proffile-needyupdate", function (req, resp) {

      var fileName;
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      else {
            fileName = req.body.hdn;
      }
      console.log(req.body);
      var email = req.body.inputEmail4;
      var name = req.body.inputname;
      var phoneno = req.body.inputcontact;
      var address = req.body.inputAddress;
      var dob = req.body.inputDob;
      var city = req.body.inputCity;
      var gender = req.body.inputGender;

      dbCon.query("update needyprofile set name=?,phoneno=?,address=?,city=?,dob=?,gender=?,picname=? where email=?", [name, phoneno, address, city, dob, gender, fileName, email], function (err) {
            if (err == null)
                  resp.send("record update successfully");
            else
                  resp.send(err);
      })
})



app.get("/jl", function (req, resp) {

      resp.sendFile(process.cwd() + "/public/j.html")
})


app.get("/get-json-recordy", function (req, resp) {
      console.log(req.query);
      // Parameter should be 'kuchEmail' instead of 'req.query.kuchEmail'
      dbCon.query("select * from donorprofile where email=?", [req.query.kuchEmail], function (err, resultTableJSON) {
          if (err == null) {
              resp.send(JSON.stringify(resultTableJSON));
          } else {
              resp.send(err);
          }
      });
    });

    app.post("/profile-submitydonor", function (req, resp) {

      var fileName = "nopic.jpg";
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      console.log(req.body);
      var email = req.body.inputEmail4;
      var name = req.body.inputname;
      var phoneno = req.body.inputcontact;
      var address = req.body.inputAddress;
      var city = req.body.inpcity;
      var avala = req.body.txttime;
      var avalp = req.body.txttime2;
      var gender = req.body.inputgender;
      var proof = req.body.inputID;

      dbCon.query("insert into donorprofile(email,name,phoneno,address,city,avalfrom,till,gender,proof,picname) values(?,?,?,?,?,?,?,?,?,?)", [email, name, phoneno, address, city, avala, avalp, gender, proof, fileName], function (err) {
            if (err == null)
                  resp.send("record saved successfully");
            else
                  resp.send(err);
      })
})
app.post("/profile-updatydonor", function (req, resp) {

      var fileName;
      if (req.files != null) {
            fileName = req.files.ppic.name;
            var path = process.cwd() + "/public/uploads/" + fileName;
            req.files.ppic.mv(path);
      }
      else {
            fileName = req.body.hdn;
      }
      console.log(req.body);
      var email = req.body.inputEmail4;
      var name = req.body.inputname;
      var phoneno = req.body.inputcontact;
      var address = req.body.inputAddress;
      var city = req.body.inpcity;
      var avala = req.body.txttime;
      var avalp = req.body.txttime2;
      var gender = req.body.inputgender;
      var proof = req.body.inputID;

      dbCon.query("update donorprofile set name=?,phoneno=?,address=?,city=?,avalfrom=?,till=?,gender=?,proof=?,picname=? where email=?", [name, phoneno, address, city, avala, avalp, gender, proof, fileName, email], function (err) {
            if (err == null)
                  resp.send("record update successfully");
            else
                  resp.send(err);
      })
})