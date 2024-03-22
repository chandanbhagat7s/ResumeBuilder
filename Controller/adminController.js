const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");
const fs = require('fs');


exports.addNewTemplate = runAsync(async (req, res, next) => {
    const { templateName, templateHtml, height, width } = req.body;

    if (!templateName || !templateHtml || !height || !width) {
        return next(new appError("please enter all the details to add new template", 400));
    }

    let fdata = fs.readFile('./Public/data/dataOfTemplates.json', 'utf-8', (err, data) => {
        if (data) {

            // console.log(JSON.parse(data));

            // write into the file the post data

            let existingTemplates = JSON.parse(data);
            existingTemplates.push({
                id: existingTemplates[existingTemplates.length - 1].id + 1 || 1,
                name: templateName, height, width,
                data: templateHtml
            })
            console.log(existingTemplates);

            existingTemplates = JSON.stringify(existingTemplates)


            fs.writeFile('./Public/data/dataOfTemplates.json', existingTemplates, 'utf-8', (err) => {

                console.log("file  written okk ");
            })

        }
    })



    res.status(200).send({
        status: true,
        data: "Template Inserted successfully"
    })


})
























