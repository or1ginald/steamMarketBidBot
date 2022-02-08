const SteamItem = require("../models/SteamItem");
const extractName = require("../utils/extractName");

class SteamItemController {
    async createSteamItem(req, res) {
        try {
            const {tg_id, marketUrl, customerPrice} = req.body
            const item = await SteamItem.findOne({tg_id, marketUrl});
            if (item) {
                res.status(400).json({message: "Bid on this item already exist"})
                return
            }
            const itemName = extractName(marketUrl);
            const steamItem = await new SteamItem({
                itemName,
                tg_id,
                customerPrice,
                marketUrl,
                marketHighestPrice: "0"
            })
            await steamItem.save();
            res.json(`Added item - ${itemName} into db`)
        } catch (e) {
            res.status(400).json({message: `Create steam item error`})
        }
    };

    async getSteamItems(req, res) {
        try {
            const tg_id = req.params.tg_id;
            const items = await SteamItem.find({tg_id});
            res.json({items})
        } catch (e) {
            res.status(400).json({message: `Get steam items error`})
        }
    };

    async getOneSteamItem(req, res) {
        try {
            let ItemId = req.params.item_id;
            const steamItem = await SteamItem.findById(ItemId);
            res.json({steamItem})
        } catch
            (e) {
            res.status(400).json({message: `Incorrect item id`})
        }
    }
    ;

    async getAllDB(req, res) {
        try {
            const allItems = await SteamItem.find();
            res.json({allItems})
        } catch
            (e) {
            res.status(400).json({message: `Can not get all items`})
        }
    }
    ;

    async updateSteamItem(req, res) {
        try {
            const _id = req.params.item_id;
            const {
                marketHighestPrice, marketUrl, customerPrice
            } = req.body;
            if (marketHighestPrice) {
                await SteamItem.updateOne({_id}, {
                    $set: {marketHighestPrice}
                })
                res.status(200).json({message: "Item highestMarketPrice was updated"})
            }
            if (marketUrl) {
                await SteamItem.updateOne({_id}, {
                    $set: {marketUrl}
                })
                res.status(200).json({message: "Item url was updated"})
            }
            if (customerPrice) {
                await SteamItem.updateOne({_id}, {
                    $set: {customerPrice}
                })
            }
            res.status(200).json({message: "Item customerPrice was updated"})
        } catch
            (e) {
            res.status(400).json({message: `Update steam item error`})
        }
    };

    async deleteSteamItem(req, res) {
        try {
            const _id = req.params.item_id;
            await SteamItem.remove({_id})
            res.status(200).json({message: "Steam item was deleted"})
        } catch (e) {
            res.status(400).json({message: `Delete steam item error`})
        }
    }
    ;
}

module.exports = new SteamItemController();