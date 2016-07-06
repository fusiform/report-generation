var application = angular.module('app');

application.controller('SchemaPreviewController', function($scope, $rootScope, $window) {

    // ORTHOMERICA FUZION SMO
    $scope.schema = [{
        "header": "Pathology",
        "body": "",
        "step_id": "medical",
        "stage_id": "pathology",
        "saved": false,
        "completed": false,
        "touched": false,
        "fields": {
            "type": "object",
            "properties": {
                "Text_DX": {
                    "title": "DX",
                    "type": "string"
                },
                "Select_Affected_Side": {
                    "title": "Affected Side",
                    "type": "string",
                    "enum": ["Left", "Right", "Bilateral"]
                }
            },
            "required": ["Text_DX", "Select_Affected_Side", "Select_Affected_Side", "Select_Affected_Side"]
        },
        "form": [{
            "key": "Text_DX",
            "type": "input",
            "placeholder": "DX"
        }, {
            "key": "Select_Affected_Side",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "type": "submit",
            "title": "Save & Continue",
            "style": "btn-success"
        }],
        "model": {}
    }, {
        "header": "Alignment",
        "body": "",
        "step_id": "medical",
        "stage_id": "alignment",
        "saved": false,
        "completed": false,
        "touched": false,
        "fields": {
            "type": "object",
            "properties": {
                "Select_Ankle_Alignment": {
                    "title": "Ankle Alignment",
                    "type": "string",
                    "enum": ["Correct", "Do Not Correct"]
                },
                "Text_Ankle_Alignment_Correction_Value": {
                    "title": "Ankle Alignment Correction Value",
                    "type": "string"
                },
                "Select_Hindfoot_Alignment": {
                    "title": "Hindfoot Alignment",
                    "type": "string",
                    "enum": ["Correct to Vertical", "Do Not Correct"]
                },
                "Select_Right_Forefoot_Alignment": {
                    "title": "Right Forefoot Alignment",
                    "type": "string",
                    "enum": ["Right Neutral", "Right Supination", "Right Pronation"]
                },
                "Select_Left_Forefoot_Alignment": {
                    "title": "Left Forefoot Alignment",
                    "type": "string",
                    "enum": ["Left Neutral", "Left Supination", "Left Pronation"]
                },
                "Text_Right_Pronation_Value": {
                    "title": "Right Pronation Value",
                    "type": "string"
                },
                "Text_Right_Supination_Value": {
                    "title": "Right Supination Value",
                    "type": "string"
                },
                "Text_Left_Supination_Value": {
                    "title": "Left Supination Value",
                    "type": "string"
                },
                "Text_Left_Pronation_Value": {
                    "title": "Left Pronation Value",
                    "type": "string"
                },
                "Select_Dorsal_Extension": {
                    "title": "Dorsal Extension",
                    "type": "string",
                    "enum": ["No Extension", "Extend Medial", "Extend Lateral", "Extend Both"]
                }
            },
            "required": ["Select_Ankle_Alignment", "Select_Ankle_Alignment", "Text_Ankle_Alignment_Correction_Value", "Select_Hindfoot_Alignment", "Select_Hindfoot_Alignment", "Select_Right_Forefoot_Alignment", "Select_Right_Forefoot_Alignment", "Select_Right_Forefoot_Alignment", "Select_Left_Forefoot_Alignment", "Select_Left_Forefoot_Alignment", "Select_Left_Forefoot_Alignment", "Select_Dorsal_Extension", "Select_Dorsal_Extension", "Select_Dorsal_Extension", "Select_Dorsal_Extension"]
        },
        "form": [{
            "key": "Select_Ankle_Alignment",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Ankle_Alignment_Correction_Value",
            "type": "input",
            "placeholder": "Ankle Alignment Correction Value",
            "condition": "schema[1].model.Select_Ankle_Alignment == 'Correct'"
        }, {
            "key": "Select_Hindfoot_Alignment",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Select_Right_Forefoot_Alignment",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Right_Pronation_Value",
            "type": "input",
            "placeholder": "Right Pronation Value",
            "condition": "schema[1].model.Select_Right_Forefoot_Alignment == 'Right Pronation'"
        }, {
            "key": "Text_Right_Supination_Value",
            "type": "input",
            "placeholder": "Right Supination Value",
            "condition": "schema[1].model.Select_Right_Forefoot_Alignment == 'Right Supination'"
        }, {
            "key": "Select_Left_Forefoot_Alignment",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Left_Supination_Value",
            "type": "input",
            "placeholder": "Left Supination Value",
            "condition": "schema[1].model.Select_Left_Forefoot_Alignment == 'Left Supination'"
        }, {
            "key": "Text_Left_Pronation_Value",
            "type": "input",
            "placeholder": "Left Pronation Value",
            "condition": "schema[1].model.Select_Left_Forefoot_Alignment == 'Left Pronation'"
        }, {
            "key": "Select_Dorsal_Extension",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "type": "submit",
            "title": "Save & Continue",
            "style": "btn-success"
        }],
        "model": {}
    }, {
        "header": "Device Specifications",
        "body": "",
        "step_id": "device",
        "stage_id": "device",
        "saved": false,
        "completed": false,
        "touched": false,
        "fields": {
            "type": "object",
            "properties": {
                "Select_Shape_Acquisition": {
                    "title": "Shape Acquisition",
                    "type": "string",
                    "enum": ["Cast", "Scan"]
                },
                "Select_Planar_Modifications": {
                    "title": "Plantar Modifications",
                    "type": "string",
                    "enum": ["Yes", "No"]
                },
                "Select_Inner_Plastic": {
                    "title": "Inner Plastic",
                    "type": "string",
                    "enum": ["FIRM-Heat Adjustable", "Proflex (Additional Charge)", "Co-Polymer", "Poly Pro"]
                },
                "Text_Inner_Liner_Color": {
                    "title": "Inner Liner Color",
                    "type": "string"
                },
                "Select_Outer_Foam_Skin_Color": {
                    "title": "Outer Foam Skin Color",
                    "type": "string",
                    "enum": ["Black", "White"]
                },
                "Text_Additional_Padding_Instructions": {
                    "title": "Additional Padding Instructions",
                    "type": "string"
                },
                "Select_Additional_Options": {
                    "title": "Additional Options",
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["Tri-Lam Insert (Diabetic)"]
                    }
                },
                "Text_Posterior_Height": {
                    "title": "Posterior Height",
                    "type": "string"
                },
                "Text_Foot_Length": {
                    "title": "Foot Length",
                    "type": "string"
                },
                "Select_Tongue_Options": {
                    "title": "Tongue Options",
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["Full Length Tongue"]
                    }
                },
                "Select_Strap_Options": {
                    "title": "Strap Options",
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["Per Picture", "Add Toe Strap", "Dacron Reinforced Straps (Additional Charge)"]
                    }
                },
                "Select_Strap_Color": {
                    "title": "Strap Color",
                    "type": "string",
                    "enum": ["White", "Color"]
                },
                "Text_Strap_Color_Value": {
                    "title": "Strap Color Value",
                    "type": "string"
                },
                "Text_Transfer": {
                    "title": "Transfer",
                    "type": "string"
                },
                "Select_External_Posting_Additional_Charge_": {
                    "title": "External Posting (Additional Charge)",
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["No External Posting", "Heel Posting", "Heel and Midfoot Posting", "Entire External Posting", "Forefoot posting to balance any supination or pronation", "Non-Skid Bottom"]
                    }
                },
                "Text_Remarks": {
                    "title": "Remarks",
                    "type": "string"
                }
            },
            "required": ["Select_Shape_Acquisition", "Select_Planar_Modifications", "Select_Shape_Acquisition", "Select_Inner_Plastic", "Select_Inner_Plastic", "Select_Inner_Plastic", "Select_Inner_Plastic", "Select_Outer_Foam_Skin_Color", "Select_Outer_Foam_Skin_Color", "Text_Posterior_Height", "Text_Foot_Length", "Text_Strap_Color_Value", "Text_Transfer"]
        },
        "form": [{
            "key": "Select_Shape_Acquisition",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Select_Planar_Modifications",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Select_Inner_Plastic",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Inner_Liner_Color",
            "type": "input",
            "placeholder": "Inner Liner Color"
        }, {
            "key": "Select_Outer_Foam_Skin_Color",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Additional_Padding_Instructions",
            "type": "input",
            "placeholder": "Additional Padding Instructions"
        }, {
            "key": "Select_Additional_Options",
            "htmlClass": "form-bg"
        }, {
            "key": "Text_Posterior_Height",
            "type": "input",
            "placeholder": "Posterior Height"
        }, {
            "key": "Text_Foot_Length",
            "type": "input",
            "placeholder": "Foot Length"
        }, {
            "key": "Select_Tongue_Options",
            "htmlClass": "form-bg"
        }, {
            "key": "Select_Strap_Options",
            "htmlClass": "form-bg"
        }, {
            "key": "Select_Strap_Color",
            "type": "radiobuttons",
            "htmlClass": "form-bg",
            "style": {
                "selected": "radio-selected btn-success",
                "unselected": "radio-unselected btn-default"
            }
        }, {
            "key": "Text_Strap_Color_Value",
            "type": "input",
            "placeholder": "Strap Color Value",
            "condition": "schema[2].model.Select_Strap_Color == 'Color'"
        }, {
            "key": "Text_Transfer",
            "type": "input",
            "placeholder": "Transfer"
        }, {
            "key": "Select_External_Posting_Additional_Charge_",
            "htmlClass": "form-bg"
        }, {
            "key": "Text_Remarks",
            "htmlClass": "form-bg",
            "placeholder": "Remarks"
        }, {
            "type": "submit",
            "title": "Save & Continue",
            "style": "btn-success"
        }],
        "model": {}
    }];


});
