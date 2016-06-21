var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fields = [
  {
    "field": "Fusiform_Title",
    "type": "title",
    "val": "FUSIFORM",
    "x": 20,
    "y": 758
  },
  {
    "field": "Name",
    "type": "text",
    "val": "Name",
    "x": 80,
    "y": 727
  },
  {
    "field": "DX",
    "type": "text",
    "val": "DX",
    "x": 34,
    "y": 709
  },
  {
    "field": "Age",
    "type": "text",
    "val": "Age",
    "x": 39,
    "y": 690
  },
  {
    "field": "Height",
    "type": "text",
    "val": "Height",
    "x": 144,
    "y": 690
  },
  {
    "field": "Weight",
    "type": "text",
    "val": "Weight",
    "x": 250,
    "y": 690
  },
  {
    "field": "Checkbox_Left",
    "type": "checkbox",
    "val": "TRUE",
    "x": 21,
    "y": 671.3
  },
  {
    "field": "Checkbox_Right",
    "type": "checkbox",
    "val": "TRUE",
    "x": 59.3,
    "y": 671.3
  },
  {
    "field": "Checkbox_Bilateral",
    "type": "checkbox",
    "val": "TRUE",
    "x": 103.3,
    "y": 671.3
  },
  {
    "field": "Pathology_Symmetrical",
    "type": "checkbox",
    "val": "TRUE",
    "x": 176.5,
    "y": 671.3
  },
  {
    "field": "Pathology_Asymmetrical",
    "type": "checkbox",
    "val": "TRUE",
    "x": 176.7,
    "y": 662.3
  },
  {
    "field": "Option_Non_Ambulatory",
    "type": "checkbox",
    "val": "TRUE",
    "x": 22.8,
    "y": 631
  },
  {
    "field": "Option_Transfers",
    "type": "checkbox",
    "val": "TRUE",
    "x": 133.4,
    "y": 631
  },
  {
    "field": "Options_Therapeutic",
    "type": "checkbox",
    "val": "TRUE",
    "x": 212.6,
    "y": 631
  },
  {
    "field": "Option_Household",
    "type": "checkbox",
    "val": "TRUE",
    "x": 302.9,
    "y": 631
  },
  {
    "field": "Option_Community",
    "type": "checkbox",
    "val": "TRUE",
    "x": 388.2,
    "y": 631
  },
  {
    "field": "Option_High_Running_Jumping",
    "type": "checkbox",
    "val": "TRUE",
    "x": 477,
    "y": 631
  },
  {
    "field": "Left_DF_PF_Alignment_90",
    "type": "checkbox",
    "val": "TRUE",
    "x": 116.9,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_3",
    "type": "checkbox",
    "val": "TRUE",
    "x": 147.3,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_5",
    "type": "checkbox",
    "val": "TRUE",
    "x": 175.9,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_7",
    "type": "checkbox",
    "val": "TRUE",
    "x": 204.3,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_10",
    "type": "checkbox",
    "val": "TRUE",
    "x": 232.4,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_Other",
    "type": "checkbox",
    "val": "TRUE",
    "x": 265.9,
    "y": 591.7
  },
  {
    "field": "Left_DF_PF_Alignment_Value",
    "type": "text",
    "val": 123,
    "x": 309.7,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_90",
    "type": "checkbox",
    "val": "TRUE",
    "x": 362.2,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_3",
    "type": "checkbox",
    "val": "TRUE",
    "x": 392.7,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_5",
    "type": "checkbox",
    "val": "TRUE",
    "x": 421.1,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_7",
    "type": "checkbox",
    "val": "TRUE",
    "x": 449.4,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_10",
    "type": "checkbox",
    "val": "TRUE",
    "x": 477.9,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_Other",
    "type": "checkbox",
    "val": "TRUE",
    "x": 511.3,
    "y": 591.7
  },
  {
    "field": "Right_DF_PF_Alignment_Value",
    "type": "text",
    "val": 123,
    "x": 554.7,
    "y": 591.7
  },
  {
    "field": "Position_Supination_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 253.2,
    "y": 548.2
  },
  {
    "field": "Position_Supination_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 271.1,
    "y": 548.2
  },
  {
    "field": "Position_Pronation_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 419.6,
    "y": 548.2
  },
  {
    "field": "Position_Pronation_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 437.7,
    "y": 548.2
  },
  {
    "field": "Hindfoot_L_Inversion",
    "type": "text",
    "val": 123,
    "x": 169.4,
    "y": 499.5
  },
  {
    "field": "Hindfoot_L_Eversion",
    "type": "text",
    "val": 123,
    "x": 321,
    "y": 499.5
  },
  {
    "field": "Hindfoot_L_Neutral",
    "type": "checkbox",
    "val": "TRUE",
    "x": 208.8,
    "y": 499.5
  },
  {
    "field": "Hindfoot_R_Inversion",
    "type": "text",
    "val": 123,
    "x": 412,
    "y": 499.5
  },
  {
    "field": "Hindfoot_R_Eversion",
    "type": "text",
    "val": 123,
    "x": 564,
    "y": 499.5
  },
  {
    "field": "Hindfoot_R_Neutral",
    "type": "checkbox",
    "val": "TRUE",
    "x": 451,
    "y": 499.5
  },
  {
    "field": "Forefoot_L_Inversion",
    "type": "text",
    "val": 123,
    "x": 169.4,
    "y": 449.5
  },
  {
    "field": "Forefoot_L_Eversion",
    "type": "text",
    "val": 123,
    "x": 321,
    "y": 449.5
  },
  {
    "field": "Forefoot_L_Neutral",
    "type": "checkbox",
    "val": "TRUE",
    "x": 208.8,
    "y": 449.5
  },
  {
    "field": "Forefoot_R_Inversion",
    "type": "text",
    "val": 123,
    "x": 412,
    "y": 449.5
  },
  {
    "field": "Forefoot_R_Eversion",
    "type": "text",
    "val": 123,
    "x": 564,
    "y": 449.5
  },
  {
    "field": "Forefoot_R_Neutral",
    "type": "checkbox",
    "val": "TRUE",
    "x": 451,
    "y": 449.5
  },
  {
    "field": "Device_Type_Insufficient_Shank",
    "type": "checkbox",
    "val": "TRUE",
    "x": 90.5,
    "y": 344.7
  },
  {
    "field": "Device_Type_Excessive_Shank",
    "type": "checkbox",
    "val": "TRUE",
    "x": 367.2,
    "y": 412.5
  },
  {
    "field": "Device_Type_Free_Dorsiflexion",
    "type": "checkbox",
    "val": "TRUE",
    "x": 387,
    "y": 293
  },
  {
    "field": "Group_A_Shank_Control_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 39,
    "y": 290.8
  },
  {
    "field": "Group_A_Shank_Control_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 55,
    "y": 290.8
  },
  {
    "field": "Group_A_Requires_Shank_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 39,
    "y": 277.2
  },
  {
    "field": "Group_A_Requires_Shank_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 55,
    "y": 277.2
  },
  {
    "field": "Group_A_ROM_Adjustability_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 39,
    "y": 263.8
  },
  {
    "field": "Group_A_ROM_Adjustability_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 55,
    "y": 263.8
  },
  {
    "field": "Group_A_SMO_Inner_Boot_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 39,
    "y": 229.6
  },
  {
    "field": "Group_A_SMO_Inner_Boot_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 55,
    "y": 229.6
  },
  {
    "field": "Group_B_Shank_Control_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 329,
    "y": 359.1
  },
  {
    "field": "Group_B_Shank_Control_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 345,
    "y": 359.1
  },
  {
    "field": "Group_B_Requires_Shank_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 329,
    "y": 345.7
  },
  {
    "field": "Group_B_Requires_Shank_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 345,
    "y": 345.7
  },
  {
    "field": "Group_B_ROM_Adjustability_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 329,
    "y": 332.1
  },
  {
    "field": "Group_B_ROM_Adjustability_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 345,
    "y": 332.1
  },
  {
    "field": "Group_C_Low_Profile_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 250.1
  },
  {
    "field": "Group_C_Low_Profile_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 346.8,
    "y": 250.1
  },
  {
    "field": "Group_C_High_Profile_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 235.7
  },
  {
    "field": "Group_C_High_Profile_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 346.8,
    "y": 235.7
  },
  {
    "field": "Group_C_Mid_Profile_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 223.1
  },
  {
    "field": "Group_C_Mid_Profile_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 346.8,
    "y": 223.1
  },
  {
    "field": "Group_C_Stop_Type_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 211.2
  },
  {
    "field": "Group_C_Stop_Type_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 346.8,
    "y": 211.2
  },
  {
    "field": "Group_C_Stop_Type_Value",
    "type": "text",
    "val": "Stop Type Value",
    "x": 408.1,
    "y": 210.8
  },
  {
    "field": "Group_C_Sport_Max_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 199
  },
  {
    "field": "Group_C_Sport_Max_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 346.8,
    "y": 199
  },
  {
    "field": "Medial_Ankle_Spacer_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 169.1
  },
  {
    "field": "Medial_Ankle_Spacer_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 169.1
  },
  {
    "field": "Medial_Ankle_Pad_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 155.4
  },
  {
    "field": "Medial_Ankle_Pad_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 155.4
  },
  {
    "field": "Lateral_Ankle_Spacer_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 133.6
  },
  {
    "field": "Lateral_Ankle_Spacer_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 133.6
  },
  {
    "field": "Lateral_Ankle_Pad_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 119.6
  },
  {
    "field": "Lateral_Ankle_Pad_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 119.6
  },
  {
    "field": "Medial_Ankle_Navicular_Spacer_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 97.6
  },
  {
    "field": "Medial_Ankle_Navicular_Spacer_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 97.6
  },
  {
    "field": "Medial_Ankle_Navicular_Pad_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 54,
    "y": 83.7
  },
  {
    "field": "Medial_Ankle_Navicular_Pad_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 69.9,
    "y": 83.7
  },
  {
    "field": "Navicular_Only_Spacer_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 189.9,
    "y": 167.8
  },
  {
    "field": "Navicular_Only_Spacer_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 205.7,
    "y": 167.8
  },
  {
    "field": "Navicular_Only_Pad_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 189.9,
    "y": 154.1
  },
  {
    "field": "Navicular_Only_Pad_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 205.7,
    "y": 154.1
  },
  {
    "field": "Base_of_Fifth_Spacer_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 189.9,
    "y": 132.9
  },
  {
    "field": "Base_of_Fifth_Spacer_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 205.7,
    "y": 132.9
  },
  {
    "field": "Base_of_Fifth_Pad_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 189.9,
    "y": 118.9
  },
  {
    "field": "Base_of_Fifth_Pad_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 205.7,
    "y": 118.9
  },
  {
    "field": "Base_of_Fifth_to_End_of_Toe_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 189.9,
    "y": 96.6
  },
  {
    "field": "Base_of_Fifth_to_End_of_Toe_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 205.7,
    "y": 96.6
  },
  {
    "field": "Max_Control_Strap_L",
    "type": "checkbox",
    "val": "TRUE",
    "x": 319.1,
    "y": 140.1
  },
  {
    "field": "Max_Control_Strap_R",
    "type": "checkbox",
    "val": "TRUE",
    "x": 331,
    "y": 140.1
  },
  {
    "field": "Transfer_Paper",
    "type": "text",
    "val": "Transfer Paper",
    "x": 420,
    "y": 138
  },
  {
    "field": "Special_Instructions",
    "type": "text",
    "val": "Special Instructions",
    "x": 320,
    "y": 103
  },
  {
    "field": "Finished_Height",
    "type": "text",
    "val": 123,
    "x": 555.8,
    "y": 122.4
  },
  {
    "field": "Foot_Length",
    "type": "text",
    "val": 123,
    "x": 555.8,
    "y": 76.2
  }
];

app.get('/', function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/pdf'});

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
      writeFormText(context,field.x,field.y,field.val,titleTextFormat);
    } else if(field.type == "text") {
      writeFormText(context,field.x,field.y,field.val,bodyTextFormat);
    } else if(field.type == "checkbox" && field.val) {
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
