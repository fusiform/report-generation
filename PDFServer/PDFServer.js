var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fields;

app.get('/', function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/pdf'});

  var fields = [
    {
        field: "Fusiform_Title",
        type: "title",
        str: "FUSIFORM",
        x: 20,
        y: 758
    },
    {
        field: "Name",
        type: "text",
        str: "Test text in name field...",
        x: 80,
        y: 727
    },
    {
        field: "DX",
        type: "text",
        str: "Test text in DX field...",
        x: 34,
        y: 709
    },
    {
        field: "Age",
        type: "text",
        str: "Age",
        x: 39,
        y: 690
    },
    {
        field: "Height",
        type: "text",
        str: "Height",
        x: 144,
        y: 690
    },
    {
        field: "Weight",
        type: "text",
        str: "Weight",
        x: 250,
        y: 690
    },
    {
        field: "Checkbox_Left",
        type: "checkbox",
        checked: true,
        x: 21,
        y: 671.3
    },
    {
        field: "Checkbox_Right",
        type: "checkbox",
        checked: true,
        x: 59.3,
        y: 671.3
    },
    {
        field: "Checkbox_Bilateral",
        type: "checkbox",
        checked: true,
        x: 103.3,
        y: 671.3
    },
    {
        field: "Pathology_Symmetrical",
        type: "checkbox",
        checked: true,
        x: 176.5,
        y: 671.3
    },
    {
        field: "Pathology_Asymmetrical",
        type: "checkbox",
        checked: true,
        x: 176.7,
        y: 662.3
    }
  ];

  var hummus = require('hummus');
  var outputStreamWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));

  var templateFileName = './form';

  var pdfWriter = hummus.createWriterToModify(templateFileName+'.pdf',{modifiedFilePath: templateFileName+'_m.pdf'});
  var page = new hummus.PDFPageModifier(pdfWriter,0);

  var bodyTextFormat = {font:pdfWriter.getFontForFile('./Helvetica.ttf'), size:8, color:0x000000};
  var titleTextFormat = {font:pdfWriter.getFontForFile('./Montserrat.otf'), size:14, color:0x29A4BE};
  var checkboxFormat = {w:6, h:6, color:0x29A4BE, type:'fill'};

  function writeFormText(ctx, x, y, str, format) {
    ctx.writeText(str,x,y,format);
  }

  function drawCheckbox(ctx, x, y, format) {
    ctx.drawRectangle(x,y,format.w,format.h,format);
  }

  function writeField(field) {
    if(field.type == "title") {
      writeFormText(context,field.x,field.y,field.str,titleTextFormat);
    } else if(field.type == "text") {
      writeFormText(context,field.x,field.y,field.str,bodyTextFormat);
    } else if(field.type == "checkbox" && field.checked) {
      drawCheckbox(context,field.x,field.y,checkboxFormat);
    }
  }

  var context = page.startContext().getContext();

  fields.forEach(writeField);

  page.endContext().writePage();
  pdfWriter.end();

  outputStreamWriter.appendPDFPagesFromPDF(templateFileName+'_m.pdf');
  outputStreamWriter.end();
  res.end();
});

app.listen(3000);
