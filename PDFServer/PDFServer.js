"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var uuid = require('uuid');
var request = require('request');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var fields = require('./fields.js')

var model = {};

///////////////

class FilledOrderForm {
    constructor(template) {
        this.fields = template;
    }
    addSelection(name, value) {
        console.log('adding:' + name + ', ' + value);
        var optionName = name + '_' + String(value).replace(' ', '_').replace('-', '_').replace(/\//g, '_');
        if (this.fields.hasOwnProperty(optionName) && this.fields[optionName].type === 'checkbox') {
            this.fields[optionName].val = true;
        }
    }
    addTextField(name, value) {
        console.log('adding:' + name + ', ' + value);
        if (value != undefined) {
            if (this.fields.hasOwnProperty(name) && this.fields[name].type === 'text') {
                this.fields[name].val = value;
            }
        }
    }
    getForm() {
        return this.fields;
    }
}

function fillModelData(fieldsTemplate, data) {
    var form = new FilledOrderForm(fieldsTemplate);
    for (var item in data) {
        if (data.hasOwnProperty(item)) {
            if (item.indexOf('Text_') === 0) {
                form.addTextField(item, data[item]);
            } else if (item.indexOf('Select_') === 0) {
                if (Array.isArray(data[item])) {
                    for (var i = 0; i < data[item].length; i++) {
                        form.addSelection(item, (data[item])[i]);
                    }
                } else {
                    form.addSelection(item, data[item]);
                }
            }
        }
    }
    return form.getForm();
}

function fillTestModel(schema) {
    for(var item in schema) {
      if (item.indexOf('Text_') === 0) {
        schema[item].val = 'xxx';
      } else if (item.indexOf('Select_') === 0) {
          schema[item].val = true;
      }
    }
    console.log(schema);
    return schema;
}

app.get('/', function(req, res) {
    var formSchema = fillTestModel(fields);

    res.writeHead(200, {
        'Content-Type': 'application/pdf'
    });

    var hummus = require('hummus');
    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(
             './Surestep_HEKO.pdf'),
        new hummus.PDFStreamForResponse(res)
    );

    var page = new hummus.PDFPageModifier(pdfWriter, 0);

    var bodyTextFormat = {
        font: pdfWriter.getFontForFile('./Helvetica.ttf'),
        size: 8,
        color: 0x000000
    };
    var titleTextFormat = {
        font: pdfWriter.getFontForFile('./Montserrat.otf'),
        size: 14,
        color: 0x29A4BE
    };
    var checkboxFormat = {
        w: 6,
        h: 6,
        color: 0x29A4BE,
        type: 'fill'
    };
    var textboxFormat = {
        color: 0xFFFFFF,
        type: 'fill'
    };
    function writeFormText(ctx, x, y, str, format) {
        ctx.writeText(str, x, y, format);
    }

    function drawCheckbox(ctx, x, y, w, h, format) {
        ctx.drawRectangle(x, y, w, h, format);
    }

    function writeField(field) {
        if (field.type == "title") {
            //writeFormText(context, field.x, field.y, field.val, titleTextFormat);
            //ctx.drawRectangle(field.x, field.y, field.w, field.h, checkboxFormat);
        } else if (field.type == "text" && field.val != undefined) {
          //context.drawRectangle(field.x, field.y, field.w, field.h, textboxFormat);
          writeFormText(context, field.x+bodyTextFormat.size*0.5, field.y-bodyTextFormat.size, field.val, bodyTextFormat);
        } else if (field.type == "checkbox" && field.val) {
          context.drawRectangle(field.x, field.y, field.w, field.h, checkboxFormat);
          drawCheckbox(context, field.x, field.y, field.w, field.h, checkboxFormat);
        }
    }

    var context = page.startContext().getContext();

    for (var element in formSchema) {
        if (formSchema.hasOwnProperty(element)) writeField(formSchema[element]);
    }

    page.endContext().writePage();
    pdfWriter.end();

    res.end();

});

app.listen(3000);
