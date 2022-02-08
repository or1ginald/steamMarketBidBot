const SteamItem = require("../models/SteamItem");
const extractName = require("../utils/extractName");
// const {json} = require("express");

class SteamItemController {
    async createSteamItem(req, res) {
        try {
            const {tg_id, marketUrl, customerPrice, marketHighestPrice} = req.body
            console.log(tg_id, marketUrl, customerPrice)
            const item = await SteamItem.findOne({tg_id, marketUrl});
            console.log(item)
            if(item){
                res.status(400).json({message: "Bid on this item already exist"})
                return
            }
            const itemName = extractName(marketUrl);
            const steamItem = await new SteamItem({ itemName, tg_id, customerPrice, marketUrl, marketHighestPrice: marketHighestPrice } )
            await steamItem.save();
            res.json(`Добавил айтем ${itemName} в базу`)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: `Create steam item error`})
        }
    };

    async getSteamItems(req, res) {
        try {
            const tg_id=req.params.id;
            const items = await SteamItem.find({tg_id});
            res.json({items})
        } catch (e) {
            res.status(400).json({message: `Get steam items error`})
        }
    };

    async getOneSteamItem(req, res) {
        try {
            const tg_id=req.params.id;
            console.log(tg_id);
            const steamItem = await SteamItem.findOne({tg_id});
            res.json({steamItem})
        } catch (e) {
            res.status(400).json({message: `Get one steam item error`})
        }
    };

    async updateSteamItem(req, res) {
        try {

        } catch (e) {
            res.status(400).json({message: `Update steam item error`})
        }
    };

    async deleteSteamItem(req, res) {
        try {
            const tg_id=req.params.id;
            await SteamItem.deleteOne({tg_id})
            res.status(200).json({message: "Steam item was deleted"})
        } catch (e) {
            res.status(400).json({message: `Delete steam item error`})
        }
    };
}

module.exports = new SteamItemController();