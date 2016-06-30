var application = angular.module('app', ['ui.bootstrap', 'schemaForm']);

application.controller('SchemaConversionController', function($scope, $rootScope, $window, $uibModal) {
    $scope.input = '';
    $scope.output1 = '';
    $scope.output2 = '';

    $scope.generateOutputs = function() {
        var inputObj = JSON.parse($scope.input);
        try {
            $scope.output1 = JSON.stringify(generatePrintOutput(inputObj));
            $scope.output2 = JSON.stringify(generateFormOutput(inputObj));
        } catch (e) {
            alert(e.message);
        }
    };

    /////////////////////////////////////////////////////////////////////////////

    function getFieldType(obj) {
        if (obj.hasOwnProperty('label')) {
            return 'text';
        } else if (obj.hasOwnProperty('groupLabel') && obj.hasOwnProperty('optionLabel')) {
            return 'checkbox';
        } else {
            throw new Error('bad field type in object: ' + JSON.stringify(obj));
        }
    }

    function getGroupName(obj) {
        var groupName = obj.groupLabel.replace(/[\W_]+/g, '_');
        return 'Select_' + groupName;
    }

    function getFieldName(obj, type) {
        if (type == 'text') {
            return 'Text_' + obj.label.replace(/[\W_]+/g, '_');
        } else if (type == 'checkbox') {
            var groupName = obj.groupLabel.replace(/[\W_]+/g, '_');
            var optionName = obj.optionLabel.replace(/[\W_]+/g, '_');
            return 'Select_' + groupName + '_' + optionName;
        } else {
            throw new Error('bad field name in object: ' + JSON.stringify(obj));
        }
    }

    function getOrigin(input, pageSizePX, pageSizePT, fieldType) {
        var xPT, yPT;
        if (fieldType == 'text') {
            xPT = input.x * pageSizePT[0] / pageSizePX[0];
            yPT = (input.y * pageSizePT[1] / pageSizePX[1]);
            return [xPT, yPT];
        } else {
            xPT = input.x * pageSizePT[0] / pageSizePX[0];
            yPT = (input.y * pageSizePT[1] / pageSizePX[1]);
            return [xPT, yPT];
        }

    }

    function getDimensions(input, pageSizePX, pageSizePT, fieldType) {
        if (fieldType == 'text') {
            var wPT = input.w * pageSizePT[0] / pageSizePX[0];
            var hPT = input.h * -1 * pageSizePT[1] / pageSizePX[1];
            return [wPT, hPT];
        } else {
            return [6, -6];
        }
    }

    function generatePrintOutput(input) {
        var template = {};
        var pageSizePX = [input[0].viewportWidthPX, input[0].viewportHeightPX];
        var pageSizePT = [612, 792];

        for (var i = 1; i < input.length; i++) {
            console.log(i, input[i]);
            var fieldType = getFieldType(input[i]);
            var fieldName = getFieldName(input[i], fieldType);
            if(input[i].w < 0) {
              input[i].x += input[i].w;
              input[i].w *= -1;
            }
            if(input[i].h < 0) {
              input[i].y += input[i].h;
              input[i].h *= -1;
            }
            input[i].y = pageSizePX[1] - input[i].y;
            var origin = getOrigin(input[i], pageSizePX, pageSizePT, fieldType);
            var dim = getDimensions(input[i], pageSizePX, pageSizePT, fieldType);
            template[fieldName] = {
                'type': fieldType,
                'x': origin[0],
                'y': origin[1],
                'w': dim[0],
                'h': dim[1]
            };
        }
        return template;
    }

    /////////////////////////////////////////////////////////////////////////////

    function generateTextElement(field) {
        return {
            key: getFieldName(field, 'text'),
            type: 'input',
            placeholder: field.label
        };
    }

    function generateSelectElement(field) {
        return {
            key: getGroupName(field),
            type: 'radiobuttons'
        };
    }

    function generateCheckboxElement(field) {
        return {
            key: getGroupName(field)
        };
    }

    function generateStage(input, stage) {
        console.log('generating stage for: ', stage);
        var element = {
            header: stage.name,
            body: '',
            step_id: stage.step,
            stage_id: stage.id,
            saved: false,
            completed: false,
            touched: false,
            fields: {
                type: 'object',
                properties: {},
                required: []
            },
            form: [],
            model: {}
        };

        for (var i = 0; i < input.length; i++) {
            var field = input[i];
            if (field.hasOwnProperty('stage') && field.stage.name == stage.name) {
                if (getFieldType(field) == 'text') {
                    element.fields.properties[getFieldName(field, 'text')] = {
                        title: field.label,
                        type: 'string'
                    };
                    element.form.push(generateTextElement(field));
                } else if (getFieldType(field) == 'checkbox') {
                    var group = {};
                    if (element.fields.properties.hasOwnProperty(getGroupName(field))) {
                        group = element.fields.properties[getGroupName(field)];
                    } else {
                        group.title = field.groupLabel;
                        console.log(field);
                        if (field.checkboxType == 'Multi') {
                            element.form.push(generateCheckboxElement(field));
                            group.type = 'array';
                            group.items = {
                                type: 'string',
                                enum: []
                            }
                        } else {
                            element.form.push(generateSelectElement(field));
                            group.type = 'string';
                            group.enum = [];
                        }
                    }
                    if (field.checkboxType == 'Multi') {
                        console.log('add to multi select');
                        group.items.enum.push(field.optionLabel);
                        console.log(group.items.enum);
                        console.log(group);
                    } else {
                        console.log('add to single select');
                        group.enum.push(field.optionLabel);
                        console.log(group.enum);
                        console.log(group);
                    }
                    element.fields.properties[getGroupName(field)] = group;
                }
                if (field.required && getFieldType(field) == 'checkbox') {
                    element.fields.required.push(getGroupName(field));
                } else if (field.required && getFieldType(field) == 'text') {
                    element.fields.required.push(getFieldName(field, 'text'));
                }
            }
        }
        element.form.push({
            type: 'submit',
            title: 'Save & Continue',
            style: 'btn-succcess'
        });
        return element;
    }

    function generateFormOutput(input) {
        var form = [];
        var stages = [];
        var stageNames = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].hasOwnProperty('stage')) {
                var stage = input[i].stage;
                if (!stageNames.includes(stage.name)) {
                    stages.push(stage);
                    stageNames.push(stage.name);
                }
            }
        }
        for (var i = 0; i < stages.length; i++) {
            if (stages[i].step == 'medical') {
                form.push(generateStage(input, stages[i]));
            }
        }
        for (var i = 0; i < stages.length; i++) {
            if (stages[i].step == 'device') {
                form.push(generateStage(input, stages[i]));
            }
        }
        return form;
    }
});


application.controller('SchemaPreviewController', function($scope, $rootScope, $window) {
    $scope.schema = [{"header":"Patient","body":"","step_id":"medical","stage_id":"patient","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Text_Last_name":{"title":"Last name","type":"string"},"Text_First_name":{"title":"First name","type":"string"},"Select_Sex":{"title":"Sex","type":"string","enum":["Male","Female"]},"Text_Date":{"title":"Date","type":"string"},"Text_Footplate_size":{"title":"Footplate size","type":"string"},"Select_Footplate":{"title":"Footplate","type":"string","enum":["N","W"]},"Text_Birth_date":{"title":"Birth date","type":"string"},"Select_Laterality":{"title":"Laterality","type":"string","enum":["Bilateral","Left only","RIght only"]}},"required":["Text_Last_name","Text_First_name","Select_Sex","Select_Sex","Text_Date","Text_Footplate_size","Select_Footplate","Select_Footplate","Text_Birth_date","Select_Laterality","Select_Laterality","Select_Laterality"]},"form":[{"key":"Text_Last_name","type":"input","placeholder":"Last name"},{"key":"Text_First_name","type":"input","placeholder":"First name"},{"key":"Select_Sex","type":"radiobuttons"},{"key":"Text_Date","type":"input","placeholder":"Date"},{"key":"Text_Footplate_size","type":"input","placeholder":"Footplate size"},{"key":"Select_Footplate","type":"radiobuttons"},{"key":"Text_Birth_date","type":"input","placeholder":"Birth date"},{"key":"Select_Laterality","type":"radiobuttons"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Practitioner","body":"","step_id":"medical","stage_id":"practitioner","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Text_Name":{"title":"Name","type":"string"},"Text_Title":{"title":"Title","type":"string"},"Text_Facility":{"title":"Facility","type":"string"},"Text_Street_address":{"title":"Street address","type":"string"},"Text_City":{"title":"City","type":"string"},"Text_State":{"title":"State","type":"string"},"Text_Zip":{"title":"Zip","type":"string"},"Text_Email":{"title":"Email","type":"string"},"Text_Phone":{"title":"Phone","type":"string"}},"required":["Text_Name","Text_Title","Text_Facility","Text_Street_address","Text_City","Text_State","Text_Zip","Text_Email","Text_Phone"]},"form":[{"key":"Text_Name","type":"input","placeholder":"Name"},{"key":"Text_Title","type":"input","placeholder":"Title"},{"key":"Text_Facility","type":"input","placeholder":"Facility"},{"key":"Text_Street_address","type":"input","placeholder":"Street address"},{"key":"Text_City","type":"input","placeholder":"City"},{"key":"Text_State","type":"input","placeholder":"State"},{"key":"Text_Zip","type":"input","placeholder":"Zip"},{"key":"Text_Email","type":"input","placeholder":"Email"},{"key":"Text_Phone","type":"input","placeholder":"Phone"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Billing","body":"","step_id":"medical","stage_id":"patient","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Select_Insurance":{"title":"Insurance","type":"string","enum":["Cascade P&O is billing the patient's insurance"]},"Text_Billing_UCAN_N":{"title":"Billing UCAN N","type":"string"},"Select_Billing_Info":{"title":"Billing Info","type":"string","enum":["Billing info is the same as practitioner facility","Billing facility"]},"Text_Billing_facility":{"title":"Billing facility","type":"string"},"Text_Street_address":{"title":"Street address","type":"string"},"Text_City":{"title":"City","type":"string"},"Text_State":{"title":"State","type":"string"},"Text_Zip":{"title":"Zip","type":"string"},"Text_P_O_Number":{"title":"P.O. Number","type":"string"}},"required":["Select_Insurance"]},"form":[{"key":"Select_Insurance","type":"radiobuttons"},{"key":"Text_Billing_UCAN_N","type":"input","placeholder":"Billing UCAN N"},{"key":"Select_Billing_Info","type":"radiobuttons"},{"key":"Text_Billing_facility","type":"input","placeholder":"Billing facility"},{"key":"Text_Street_address","type":"input","placeholder":"Street address"},{"key":"Text_City","type":"input","placeholder":"City"},{"key":"Text_State","type":"input","placeholder":"State"},{"key":"Text_Zip","type":"input","placeholder":"Zip"},{"key":"Text_P_O_Number","type":"input","placeholder":"P.O. Number"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Cast Correction","body":"","step_id":"medical","stage_id":"castcorrection","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Select_Ankle_Alignment":{"title":"Ankle Alignment","type":"string","enum":["Correct 3-4 DEG DF","Correct to","Do not correct (Cast alignment OK)"]},"Text_Correct_to":{"title":"Correct to","type":"string"},"Select_Correct_to":{"title":"Correct to","type":"string","enum":["DF","PF"]},"Select_Hindfoot_Alignment":{"title":"Hindfoot Alignment","type":"string","enum":["Correct to vertical (if misaligned)","Do not correct"]},"Select_Right_Forefoot_Alignment":{"title":"Right Forefoot Alignment","type":"string","enum":["Valgus","Varus","Neutral"]},"Select_Left_Forefoot_Alignment":{"title":"Left Forefoot Alignment","type":"string","enum":["Neutral","Varus","Valgus"]},"Text_Right_valgus":{"title":"Right valgus","type":"string"},"Text_Right_varus":{"title":"Right varus","type":"string"},"Text_Left_varus":{"title":"Left varus","type":"string"},"Text_Left_valgus":{"title":"Left valgus","type":"string"}},"required":["Select_Ankle_Alignment","Select_Ankle_Alignment"]},"form":[{"key":"Select_Ankle_Alignment","type":"radiobuttons"},{"key":"Text_Correct_to","type":"input","placeholder":"Correct to"},{"key":"Select_Correct_to","type":"radiobuttons"},{"key":"Select_Hindfoot_Alignment","type":"radiobuttons"},{"key":"Select_Right_Forefoot_Alignment","type":"radiobuttons"},{"key":"Select_Left_Forefoot_Alignment","type":"radiobuttons"},{"key":"Text_Right_valgus","type":"input","placeholder":"Right valgus"},{"key":"Text_Right_varus","type":"input","placeholder":"Right varus"},{"key":"Text_Left_varus","type":"input","placeholder":"Left varus"},{"key":"Text_Left_valgus","type":"input","placeholder":"Left valgus"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Bottom Stabilization","body":"","step_id":"medical","stage_id":"stabilization","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Select_Bottom_Stabilization":{"title":"Bottom Stabilization","type":"string","enum":["None - Standard","Heel","Midfoot","Both","Entire bottom stabilized with foam sole","Entire bottom stabilized with foam sole and non-skid cover"]}},"required":[]},"form":[{"key":"Select_Bottom_Stabilization","type":"radiobuttons"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Construction","body":"","step_id":"device","stage_id":"construction","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Select_Posterior_ankle_trimline":{"title":"Posterior ankle trimline","type":"string","enum":["PF Block (standard)","Adjustable PF Block (additional charge)","Free ankle"]},"Select_Hinge_Type":{"title":"Hinge Type","type":"string","enum":["Dorsi-assist Tamarack Standard","Durometer 75 d","Durometer 85 d","Durometer 95 d","Straight Tamarack"]},"Select_Posterior_Height":{"title":"Posterior Height","type":"string","enum":["2/3 to 3/4 of leg length","Specify"]},"Text_Specify_posterior_height":{"title":"Specify posterior height","type":"string"},"Select_Inner_Liner":{"title":"Inner Liner","type":"string","enum":["Polyethylene","Softy foam","None","Add extra navicular padding","Add plastizote to malleoli"]},"Select_Straps":{"title":"Straps","type":"string","enum":["Add toe abduction strap","Add forefront strap"]},"Select_Strap_Color":{"title":"Strap Color","type":"string","enum":["White","Other"]},"Text_Strap_Color_Other":{"title":"Strap Color Other","type":"string"},"Select_Instep_Strap_Pattern":{"title":"Instep Strap Pattern","type":"string","enum":["No pattern","Other"]},"Text_Other_Instep_Strap_Pattern":{"title":"Other Instep Strap Pattern","type":"string"},"Select_Transfer_Pattern":{"title":"Transfer Pattern","type":"string","enum":["No Transfer","Pattern","Provide Own Pattern"]},"Text_Transfer_Pattern":{"title":"Transfer Pattern","type":"string"}},"required":["Select_Inner_Liner","Select_Inner_Liner","Select_Inner_Liner","Select_Inner_Liner","Select_Inner_Liner","Select_Straps","Select_Straps","Select_Strap_Color","Select_Strap_Color","Select_Instep_Strap_Pattern","Select_Instep_Strap_Pattern","Select_Transfer_Pattern","Select_Transfer_Pattern","Select_Transfer_Pattern"]},"form":[{"key":"Select_Posterior_ankle_trimline","type":"radiobuttons"},{"key":"Select_Hinge_Type","type":"radiobuttons"},{"key":"Select_Posterior_Height","type":"radiobuttons"},{"key":"Text_Specify_posterior_height","type":"input","placeholder":"Specify posterior height"},{"key":"Select_Inner_Liner","type":"radiobuttons"},{"key":"Select_Straps","type":"radiobuttons"},{"key":"Select_Strap_Color","type":"radiobuttons"},{"key":"Text_Strap_Color_Other","type":"input","placeholder":"Strap Color Other"},{"key":"Select_Instep_Strap_Pattern","type":"radiobuttons"},{"key":"Text_Other_Instep_Strap_Pattern","type":"input","placeholder":"Other Instep Strap Pattern"},{"key":"Select_Transfer_Pattern","type":"radiobuttons"},{"key":"Text_Transfer_Pattern","type":"input","placeholder":"Transfer Pattern"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}},{"header":"Toe Shelf","body":"","step_id":"device","stage_id":"toeshelf","saved":false,"completed":false,"touched":false,"fields":{"type":"object","properties":{"Select_Outer_Frame":{"title":"Outer Frame","type":"string","enum":["Full-length under plantar surface","Trimmed just proximal to met. heads under plantar surface","Trimmed distal to met. heads under plantar surface"]},"Select_Toe_Shelf_Inner_Liner":{"title":"Toe Shelf Inner Liner","type":"array","items":{"type":"string","enum":["Flexible","Medial","Lateral containment"]}}},"required":["Select_Outer_Frame","Select_Outer_Frame","Select_Outer_Frame","Select_Toe_Shelf_Inner_Liner","Select_Toe_Shelf_Inner_Liner","Select_Toe_Shelf_Inner_Liner"]},"form":[{"key":"Select_Outer_Frame","type":"radiobuttons"},{"key":"Select_Toe_Shelf_Inner_Liner"},{"type":"submit","title":"Save & Continue","style":"btn-succcess"}],"model":{}}];
});
