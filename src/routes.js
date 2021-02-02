var express = require("express");
var router = express.Router();
var con = require("./db");
var bodyparser = require("body-parser");
const { query } = require("express");
const e = require("express");
var encoder = bodyparser.urlencoded();
var mydetails = [];
var totaldealer = "";
var totalactivedealer = "";
// =====================dashboard counter code=================
router.get("/", (req, res) => {
  con.query(
    "select count(dealer_id) as totaldealer from dealer_web ",
    (err, result) => {
      if (err) throw err;
//       var totaldealer = JSON.stringify(result[0].totaldealer);
        totaldealer = result.totaldealer
    }
  );

  console.log(totaldealer);

  con.query(
    "select count(dealer_id) as activedealer from dealer_web where payment_status='1'",
    (error, result1) => {
      if (error) throw error;
//       var totalactivedealer = result1[0].activedealer;
      totalactivedealer = result1.activedealer;
    }
  );
  con.query(
    "select dealer_id from dealer_web where payment_status='0'",
    (err2, res2) => {
      if (err2) {
        throw err2;
      } else {
        res2.forEach((element) => {
          var dealer_id = element.dealer_id;
          con.query(
            "select id from transaction where user_id='D" + dealer_id + "'",
            (err3, req3) => {
              var userCount = 0;
              var userCount1 = 0;
              if (err3) {
                throw err3;
              } else {
                var d = 0;
                if (req3 !== null) {
                  userCount++;
                } else {
                  userCount1++;
                }
              }
              // console.log(userCount);
            }
          );
        });
      }
    }
  );

  data = {
    totaldealer: totaldealer,
    totalactivedealer: totalactivedealer,
  };

  res.render("dashboard", { mydata: data });
});

// ===================profile start=========================
router.get("/profile", function (req, res) {
  res.render("profile/profile", {
    user_id: req.session.users_id,
    user_name: req.session.users_name,
    user_category: req.session.user_category,
  });
});
//=======================profile end========================
// =============register================
router.post("/addLabour", function (req, res) {
  con.query("select * from state", function (error, result) {
    if (error) throw error;

    res.json({ msg: "success", data: result });
  });
});
router.get("/add_labour", function (req, res) {
  res.render("add_role/add_labour", { success: "" });
});
router.get("/add_labour1", function (req, res) {
  res.render("add_role/add_labour", { success: "success" });
});

router.get("/add_book_and_enquiry", (req, res) => {
  res.render("add_role/add_book_enquiry");
});

router.post("/fetch_city", encoder, function (req, res) {
  var state_id = req.body.state_id;
  con.query(
    "select * from city where city_state_id='" + state_id + "'",
    function (error, result) {
      if (error) throw error;
      res.json({ msg: "success", data: result });
    }
  );
});

// =======================================view all==============
router.get("/view_all_dealer", function (req, res) {
  con.query("select * from dealer_web", function (error, result) {
    if (error) throw error;
    res.render("view_role/view_dealer", { data: result });
  });
});

router.get("/dealer_more_button", function (req, res) {
  var dealer_id = req.query["dealer_id"];
  con.query(
    "select * from dealer_web JOIN state ON dealer_web.dealer_state=state.state_id JOIN city ON dealer_web.dealer_city=city.city_id where dealer_id=" +
      dealer_id +
      "",
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.render("view_role/view_dealer_details", { data: result });
      }
    }
  );
});

router.get("/view_all_labour", function (req, res) {
  con.query("select * from labour", function (error, result) {
    if (error) throw error;
    res.render("view_role/view_all_labour", { data: result });
  });
});
router.get("/labour_more_button", function (req, res) {
  var id = req.query["labour_id"];
  con.query(
    "select * from labour JOIN state ON labour.state=state.state_id JOIN city ON labour.city=city.city_id where id=" +
      id +
      "",
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.render("view_role/view_all_labour_details", { data: result });
      }
    }
  );
});
router.get("/view_all_franchisee", function (req, res) {
  con.query("select * from franchisee", function (error, result) {
    if (error) throw error;
    res.render("view_role/view_all_franchisee", { data: result });
  });
});

router.get("/franchisee_more_button", function (req, res) {
  var franchisee_id = req.query["franchisee_id"];
  con.query(
    "select * from franchisee JOIN state ON franchisee.franchisee_state=state.state_id JOIN city ON franchisee.franchisee_city=city.city_id where franchisee_id=" +
      franchisee_id +
      "",
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.render("view_role/view_all_franchisee_details", { data: result });
      }
    }
  );
});

router.get("/view_all_cityfranchisee", function (req, res) {
  con.query(
    "select * from users where users_type='9'",
    function (error, result) {
      if (error) throw error;
      // console.log(result);
      res.render("view_role/view_all_cityfranchisee", { data: result });
    }
  );
});

router.get("/cityfranchisee_more_button", function (req, res) {
  var users_id = req.query["users_id"];
  con.query(
    "select * from users JOIN state ON users.users_state=state.state_id JOIN city ON users.users_city=city.city_id where users_id=" +
      users_id +
      "",
    function (error, result) {
      if (error) {
        throw error;
      } else {
        // console.log(result);
        res.render("view_role/view_all_cityfranchisee_details", {
          data: result,
        });
      }
    }
  );
});

router.post("/register/labour", encoder, (req, res, next) => {
  var name = req.body.name;
  var mobile = req.body.mobile;
  var state = req.body.state;
  var city = req.body.city;
  var district = req.body.district;
  var tehsil = req.body.tehsil;
  var address = req.body.address;
  var zipcode = req.body.zipcode;
  var category = req.body.category;
  var QR_id_no = req.body.qr_id_no;
  con.query(
    "insert into labour(name,mobile,state,city,district,tehsil,address,zipcode,category,QR_id_no,status) values('" +
      name +
      "','" +
      mobile +
      "','" +
      state +
      "','" +
      city +
      "','" +
      district +
      "','" +
      tehsil +
      "','" +
      address +
      "','" +
      zipcode +
      "','" +
      category +
      "','" +
      QR_id_no +
      "','" +
      1 +
      "')",
    function (err, res) {
      if (err) {
        throw err;
      }
    }
  );
  res.redirect("/add_labour1");
});
router.get("/userlogout", (req, res) => {
  req.session.destroy(function (err) {
    res.render("login");
  });
});
module.exports = router;
