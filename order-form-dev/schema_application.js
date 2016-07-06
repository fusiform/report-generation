var application = angular.module('app', ['ui.bootstrap', 'schemaForm', 'ngSanitize']);

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
        if (fieldType == 'text' || (fieldType == 'checkbox' && input.drawingType == 'outline')) {
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
            type: 'radiobuttons',
            htmlClass: 'form-bg',
            style: {
                selected: 'radio-selected btn-success',
                unselected: 'radio-unselected btn-default'
            }
        };
    }

    function generateCheckboxElement(field) {
        return {
            key: getGroupName(field),
            htmlClass: 'form-bg'
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
            style: 'btn-success'
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
