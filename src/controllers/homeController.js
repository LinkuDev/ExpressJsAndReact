import { asIs } from "sequelize";
import db from "../models";
import CRUDservice, { createNewUser, getUserInfoById } from "../services/CRUDservice";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homePage.ejs", { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    // console.log(req.body);
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send("post from server");
}

let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log("----------------");
    console.log(data);

    return res.render('displayCRUD.ejs', { dataTable: data });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        return res.render('editUser.ejs', { user: userData })
    }
    else {
        return res.send("User not found");
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservice.updataUserData(data);
    return res.render('displayCRUD.ejs', { dataTable: allUser })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}