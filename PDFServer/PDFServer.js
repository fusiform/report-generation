"use strict";

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fields = {
  "Fusiform_Title": {
    "type": "title",
    "val": "FUSIFORM",
    "x": 20,
    "y": 758
  },
  "Text_Name": {
    "type": "text",
    "x": 80,
    "y": 727
  },
  "Text_DX": {
    "type": "text",
    "x": 34,
    "y": 709
  },
  "Text_Age": {
    "type": "text",
    "x": 39,
    "y": 690
  },
  "Text_Height": {
    "type": "text",
    "x": 144,
    "y": 690
  },
  "Text_Weight": {
    "type": "text",
    "x": 250,
    "y": 690
  },
  "Select_Options_Left": {
    "type": "checkbox",
    "x": 21,
    "y": 671.3
  },
  "Select_Options_Right": {
    "type": "checkbox",
    "x": 59.3,
    "y": 671.3
  },
  "Select_Options_Bilateral": {
    "type": "checkbox",
    "x": 103.3,
    "y": 671.3
  },
  "Select_Pathology_Symmetrical": {
    "type": "checkbox",
    "x": 176.5,
    "y": 671.3
  },
  "Select_Pathology_Asymmetrical": {
    "type": "checkbox",
    "x": 176.7,
    "y": 662.3
  },
  "Text_Heel_Height_of_Shoe": {
    "type": "text",
    "x": 120,
    "y": 645
  },
  "Select_Function_Non_Ambulatory": {
    "type": "checkbox",
    "x": 22.8,
    "y": 631
  },
  "Select_Function_Transfers": {
    "type": "checkbox",
    "x": 133.4,
    "y": 631
  },
  "Select_Function_Therapeutic": {
    "type": "checkbox",
    "x": 212.6,
    "y": 631
  },
  "Select_Function_Household": {
    "type": "checkbox",
    "x": 302.9,
    "y": 631
  },
  "Select_Function_Community": {
    "type": "checkbox",
    "x": 388.2,
    "y": 631
  },
  "Select_Function_High_Running_Jumping": {
    "type": "checkbox",
    "x": 477,
    "y": 631
  },
  "Select_Left_DF_PF_Alignment_90": {
    "type": "checkbox",
    "x": 116.9,
    "y": 591.7
  },
  "Select_Left_DF_PF_Alignment__3": {
    "type": "checkbox",
    "x": 147.3,
    "y": 591.7
  },
  "Select_Left_DF_PF_Alignment__5": {
    "type": "checkbox",
    "x": 175.9,
    "y": 591.7
  },
  "Select_Left_DF_PF_Alignment__7": {
    "type": "checkbox",
    "x": 204.3,
    "y": 591.7
  },
  "Select_Left_DF_PF_Alignment__10": {
    "type": "checkbox",
    "x": 232.4,
    "y": 591.7
  },
  "Select_Left_DF_PF_Alignment_Other": {
    "type": "checkbox",
    "x": 265.9,
    "y": 591.7
  },
  "Text_Left_DF_PF_Alignment_Value": {
    "type": "text",
    "x": 309.7,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_90": {
    "type": "checkbox",
    "x": 362.2,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_3": {
    "type": "checkbox",
    "x": 392.7,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_5": {
    "type": "checkbox",
    "x": 421.1,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_7": {
    "type": "checkbox",
    "x": 449.4,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_10": {
    "type": "checkbox",
    "x": 477.9,
    "y": 591.7
  },
  "Select_Right_DF_PF_Alignment_Other": {
    "type": "checkbox",
    "x": 511.3,
    "y": 591.7
  },
  "Text_Right_DF_PF_Alignment_Value": {
    "type": "text",
    "x": 554.7,
    "y": 591.7
  },
  "Select_Left_Position_To_Control_Supination": {
    "type": "checkbox",
    "x": 253.2,
    "y": 548.2
  },
  "Select_Right_Position_To_Control_Supination": {
    "type": "checkbox",
    "x": 271.1,
    "y": 548.2
  },
  "Select_Left_Position_To_Control_Pronation": {
    "type": "checkbox",
    "x": 419.6,
    "y": 548.2
  },
  "Select_Right_Position_To_Control_Pronation": {
    "type": "checkbox",
    "x": 437.7,
    "y": 548.2
  },
  "Text_Left_Hindfoot_Inversion": {
    "type": "text",
    "x": 169.4,
    "y": 499.5
  },
  "Text_Left_Hindfoot_Eversion": {
    "type": "text",
    "x": 321,
    "y": 499.5
  },
  "Select_Left_Hindfoot_Alignment_Neutral": {
    "type": "checkbox",
    "x": 208.8,
    "y": 499.5
  },
  "Text_Hindfoot_R_Inversion": {
    "type": "text",
    "x": 412,
    "y": 499.5
  },
  "Text_Hindfoot_R_Eversion": {
    "type": "text",
    "x": 564,
    "y": 499.5
  },
  "Select_Right_Hindfoot_Alignment_Neutral": {
    "type": "checkbox",
    "x": 451,
    "y": 499.5
  },
  "Text_Left_Forefoot_Inversion": {
    "type": "text",
    "x": 169.4,
    "y": 449.5
  },
  "Text_Left_Forefoot_Eversion": {
    "type": "text",
    "x": 321,
    "y": 449.5
  },
  "Select_Right_Forefoot_Alignment_Neutral": {
    "type": "checkbox",
    "x": 208.8,
    "y": 449.5
  },
  "Text_Forefoot_R_Inversion": {
    "type": "text",
    "x": 412,
    "y": 449.5
  },
  "Text_Forefoot_R_Eversion": {
    "type": "text",
    "x": 564,
    "y": 449.5
  },
  "Select_Forefoot_R_Neutral": {
    "type": "checkbox",
    "x": 451,
    "y": 449.5
  },
  "Select_Device_Type_Insufficient_Shank": {
    "type": "checkbox",
    "x": 90.5,
    "y": 344.7
  },
  "Select_Device_Type_Excessive_Shank": {
    "type": "checkbox",
    "x": 367.2,
    "y": 412.5
  },
  "Select_Device_Type_Free_Dorsiflexion": {
    "type": "checkbox",
    "x": 387,
    "y": 293
  },
  "Select_Group_A_Shank_Control_L": {
    "type": "checkbox",
    "x": 39,
    "y": 290.8
  },
  "Select_Group_A_Shank_Control_R": {
    "type": "checkbox",
    "x": 55,
    "y": 290.8
  },
  "Select_Group_A_Requires_Shank_L": {
    "type": "checkbox",
    "x": 39,
    "y": 277.2
  },
  "Select_Group_A_Requires_Shank_R": {
    "type": "checkbox",
    "x": 55,
    "y": 277.2
  },
  "Select_Group_A_ROM_Adjustability_L": {
    "type": "checkbox",
    "x": 39,
    "y": 263.8
  },
  "Select_Group_A_ROM_Adjustability_R": {
    "type": "checkbox",
    "x": 55,
    "y": 263.8
  },
  "Select_Group_A_SMO_Inner_Boot_L": {
    "type": "checkbox",
    "x": 39,
    "y": 229.6
  },
  "Select_Group_A_SMO_Inner_Boot_R": {
    "type": "checkbox",
    "x": 55,
    "y": 229.6
  },
  "Select_Group_B_Shank_Control_L": {
    "type": "checkbox",
    "x": 329,
    "y": 359.1
  },
  "Select_Group_B_Shank_Control_R": {
    "type": "checkbox",
    "x": 345,
    "y": 359.1
  },
  "Select_Group_B_Requires_Shank_L": {
    "type": "checkbox",
    "x": 329,
    "y": 345.7
  },
  "Select_Group_B_Requires_Shank_R": {
    "type": "checkbox",
    "x": 345,
    "y": 345.7
  },
  "Select_Group_B_ROM_Adjustability_L": {
    "type": "checkbox",
    "x": 329,
    "y": 332.1
  },
  "Select_Group_B_ROM_Adjustability_R": {
    "type": "checkbox",
    "x": 345,
    "y": 332.1
  },
  "Select_Group_C_Low_Profile_L": {
    "type": "checkbox",
    "x": 331,
    "y": 250.1
  },
  "Select_Group_C_Low_Profile_R": {
    "type": "checkbox",
    "x": 346.8,
    "y": 250.1
  },
  "Select_Group_C_High_Profile_L": {
    "type": "checkbox",
    "x": 331,
    "y": 235.7
  },
  "Select_Group_C_High_Profile_R": {
    "type": "checkbox",
    "x": 346.8,
    "y": 235.7
  },
  "Select_Group_C_Mid_Profile_L": {
    "type": "checkbox",
    "x": 331,
    "y": 223.1
  },
  "Select_Group_C_Mid_Profile_R": {
    "type": "checkbox",
    "x": 346.8,
    "y": 223.1
  },
  "Select_Group_C_Stop_Type_L": {
    "type": "checkbox",
    "x": 331,
    "y": 211.2
  },
  "Select_Group_C_Stop_Type_R": {
    "type": "checkbox",
    "x": 346.8,
    "y": 211.2
  },
  "Text_Group_C_Stop_Type_Value": {
    "type": "text",
    "x": 408.1,
    "y": 210.8
  },
  "Select_Group_C_Sport_Max_L": {
    "type": "checkbox",
    "x": 331,
    "y": 199
  },
  "Select_Group_C_Sport_Max_R": {
    "type": "checkbox",
    "x": 346.8,
    "y": 199
  },
  "Select_Medial_Ankle_L_Spacer": {
    "type": "checkbox",
    "x": 54,
    "y": 169.1
  },
  "Select_Medial_Ankle_R_Spacer": {
    "type": "checkbox",
    "x": 69.9,
    "y": 169.1
  },
  "Select_Medial_Ankle_L_Pad": {
    "type": "checkbox",
    "x": 54,
    "y": 155.4
  },
  "Select_Medial_Ankle_R_Pad": {
    "type": "checkbox",
    "x": 69.9,
    "y": 155.4
  },
  "Select_Lateral_Ankle_L_Spacer": {
    "type": "checkbox",
    "x": 54,
    "y": 133.6
  },
  "Select_Lateral_Ankle_R_Spacer": {
    "type": "checkbox",
    "x": 69.9,
    "y": 133.6
  },
  "Select_Lateral_Ankle_L_Pad": {
    "type": "checkbox",
    "x": 54,
    "y": 119.6
  },
  "Select_Lateral_Ankle_R_Pad": {
    "type": "checkbox",
    "x": 69.9,
    "y": 119.6
  },
  "Select_Medial_Ankle_Navicular_L_Spacer": {
    "type": "checkbox",
    "x": 54,
    "y": 97.6
  },
  "Select_Medial_Ankle_Navicular_R_Spacer": {
    "type": "checkbox",
    "x": 69.9,
    "y": 97.6
  },
  "Select_Medial_Ankle_Navicular_L_Pad": {
    "type": "checkbox",
    "x": 54,
    "y": 83.7
  },
  "Select_Medial_Ankle_Navicular_R_Pad": {
    "type": "checkbox",
    "x": 69.9,
    "y": 83.7
  },
  "Select_Navicular_Only_L_Spacer": {
    "type": "checkbox",
    "x": 189.9,
    "y": 167.8
  },
  "Select_Navicular_Only_R_Spacer": {
    "type": "checkbox",
    "x": 205.7,
    "y": 167.8
  },
  "Select_Navicular_Only_L_Pad": {
    "type": "checkbox",
    "x": 189.9,
    "y": 154.1
  },
  "Select_Navicular_Only_R_Pad": {
    "type": "checkbox",
    "x": 205.7,
    "y": 154.1
  },
  "Select_Base_of_Fifth_L_Spacer": {
    "type": "checkbox",
    "x": 189.9,
    "y": 132.9
  },
  "Select_Base_of_Fifth_R_Spacer": {
    "type": "checkbox",
    "x": 205.7,
    "y": 132.9
  },
  "Select_Base_of_Fifth_L_Pad": {
    "type": "checkbox",
    "x": 189.9,
    "y": 118.9
  },
  "Select_Base_of_Fifth_R_Pad": {
    "type": "checkbox",
    "x": 205.7,
    "y": 118.9
  },
  "Select_Base_of_Fifth_to_End_of_Toe_L": {
    "type": "checkbox",
    "x": 189.9,
    "y": 96.6
  },
  "Select_Base_of_Fifth_to_End_of_Toe_R": {
    "type": "checkbox",
    "x": 205.7,
    "y": 96.6
  },
  "Select_Max_Control_Strap_L": {
    "type": "checkbox",
    "x": 319.1,
    "y": 140.1
  },
  "Select_Max_Control_Strap_R": {
    "type": "checkbox",
    "x": 331,
    "y": 140.1
  },
  "Text_Transfer_Paper": {
    "type": "text",
    "x": 420,
    "y": 138
  },
  "Text_Special_Instructions": {
    "type": "text",
    "x": 320,
    "y": 103
  },
  "Text_Finished_Height": {
    "type": "text",
    "x": 555.8,
    "y": 122.4
  },
  "Text_Foot_Length": {
    "type": "text",
    "x": 555.8,
    "y": 76.2
  }
};

var model = {
  'Text_Name': 'xxxxx',
  'Text_DX': 'yyyyyy',
  'Select_Pathology': ['Symmetrical', 'Asymmetrical']
}

///////////////

class FilledOrderForm {
  constructor(template) {
    this.fields = template;
  }
  addSelection(name, value) {
    console.log('adding:' + name+', '+value);
    var optionName = name + '_' + String(value).replace(' ','_');
    if(this.fields.hasOwnProperty(optionName) && this.fields[optionName].type === 'checkbox') {
      this.fields[optionName].val = true;
    }
  }
  addTextField(name, value) {
    console.log('adding:' + name+', '+value);
    if(value != undefined) {
      if(this.fields.hasOwnProperty(name) && this.fields[name].type === 'text') {
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
  for(var item in data) {
    if(data.hasOwnProperty(item)) {
      if(item.indexOf('Text_') === 0) {
        form.addTextField(item, data[item]);
      } else if(item.indexOf('Select_') === 0) {
        if(Array.isArray(data[item])) {
          for(var i=0; i<data[item].length; i++) {
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


app.get('/', function(req, res) {

  var templateFileName = './form';

  var formSchema = fillModelData(fields, model);

  res.writeHead(200, {'Content-Type': 'application/pdf'});

  var hummus = require('hummus');
  var outputStreamWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
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
    } else if(field.type == "text" && field.val != undefined) {
      writeFormText(context,field.x,field.y,field.val,bodyTextFormat);
    } else if(field.type == "checkbox" && field.val) {
      drawCheckbox(context,field.x,field.y,checkboxFormat);
    }
  }

  var context = page.startContext().getContext();

  for (var element in formSchema) {
    if(formSchema.hasOwnProperty(element)) writeField(formSchema[element]);
  }

  page.endContext().writePage();
  pdfWriter.end();

  outputStreamWriter.appendPDFPagesFromPDF(templateFileName+'_m.pdf');
  outputStreamWriter.end();
  res.end();
});

app.listen(3000);
