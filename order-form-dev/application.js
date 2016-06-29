var application = angular.module('app', ['ui.bootstrap']);

application.controller('PanelController', function($scope, $rootScope, $window, $uibModal) {
  $scope.window = $window;

  $scope.model = [];
  $scope.json = '';

  $scope.loadPDF = function(filename) {
    PDFJS.getDocument(filename).then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var pixelWidth = document.getElementById('pdf-container').clientWidth;
        var viewport = page.getViewport(1);
        var scale = pixelWidth / viewport.width;
        var viewport = page.getViewport(scale);

        var pdfCanvas = document.getElementById('pdf-canvas');
        var pdfContext = pdfCanvas.getContext('2d');
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        var overlayCanvas = document.getElementById('overlay-canvas');
        var overlayContext = overlayCanvas.getContext('2d');
        overlayCanvas.height = viewport.height;
        overlayCanvas.width = viewport.width;

        var renderContext = {
          canvasContext: pdfContext,
          viewport: viewport
        };
        page.render(renderContext);
        $scope.model.push({
          viewportWidthPX: viewport.width,
          viewportHeightPX: viewport.height
        });
        $scope.updateModel();
      });
    });
  };

  var modalInstance = $uibModal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'fileSelectModal.html',
    controller: 'FileSelectModalController'
  });

  modalInstance.result.then(function (filenameInput) {
    $scope.loadPDF(filenameInput.valueOf());
    $scope.filename = '...'+filenameInput.substring(filenameInput.lastIndexOf('/'));
  });

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.drawingSelect = function(tab) {
    switch(tab) {
      case 0:
      $rootScope.outlineDrawingAllowed = false;
      $rootScope.rectDrawingAllowed = false;
      break;
      case 1:
      $rootScope.outlineDrawingAllowed = true;
      $rootScope.rectDrawingAllowed = false;
      break;
      case 2:
      if($scope.pendingCheckbox.drawingType == 'outline') {
        $rootScope.outlineDrawingAllowed = true;
        $rootScope.rectDrawingAllowed = false;
      } else {
        $rootScope.outlineDrawingAllowed = false;
        $rootScope.rectDrawingAllowed = true;
      }
    }
  };

  //overall model
  $scope.updateModel = function() {
    $scope.json = JSON.stringify($scope.model)
      .replace('},\s{','},\n\n{')
      .replace('[{','[\n{')
      .replace('}]','}\n]');
  };
  $scope.updateFromJSON = function() {
    $scope.model = JSON.parse($scope.json);
  }
  $scope.updateModel();

  //stages tab
  $scope.stages = [];
  $scope.pendingStage = {name: ''}
  $scope.removeStage = function(index) {
    $scope.stages.splice(index, 1);
  };
  $scope.addStage = function() {
    $scope.stages.push(JSON.parse(JSON.stringify($scope.pendingStage)));
    $scope.pendingStage.name = '';
    $scope.pendingStage.id = '';
  };

  //text field tab
  $scope.pendingTextField = {};
  $scope.pendingTextFieldPosition = '';
  $scope.selectTextFieldStage = function(clicked) {
    $scope.pendingTextField.stage = clicked;
  };
  $scope.addTextField = function() {
    $rootScope.saveOutline();
    $scope.pendingTextField.x = $rootScope.pendingOutline[0];
    $scope.pendingTextField.y = $rootScope.pendingOutline[1];
    $scope.pendingTextField.w = $rootScope.pendingOutline[2];
    $scope.pendingTextField.h = $rootScope.pendingOutline[3];
    $scope.model.push(JSON.parse(JSON.stringify($scope.pendingTextField)));
    $scope.updateModel();
    $scope.clearTextFieldForm();
  };
  $scope.clearTextFieldForm = function() {
    $scope.pendingTextField.label = '';
    $scope.pendingTextFieldPosition = '';
  };

  //checkbox group tab
  $scope.pendingCheckbox = {
    drawingType: 'box'
  };
  $scope.pendingCheckboxPosition = '';
  $scope.selectCheckboxStage = function(clicked) {
    $scope.pendingCheckbox.stage = clicked;
  };

  $scope.addCheckbox = function() {
    if($scope.pendingCheckbox.drawingType == 'box') {
      $scope.pendingCheckbox.x = $rootScope.pendingRect[0];
      $scope.pendingCheckbox.y = $rootScope.pendingRect[1];
      $rootScope.saveRect();
    } else {
      $scope.pendingCheckbox.x = $rootScope.pendingOutline[0];
      $scope.pendingCheckbox.y = $rootScope.pendingOutline[1];
      $scope.pendingCheckbox.w = $rootScope.pendingOutline[2];
      $scope.pendingCheckbox.h = $rootScope.pendingOutline[3];
      $rootScope.saveOutline();
    }
    $scope.model.push(JSON.parse(JSON.stringify($scope.pendingCheckbox)));
    $scope.updateModel();
    $scope.clearCheckboxForm();
  };
  $scope.clearCheckboxForm = function() {
    $scope.pendingCheckbox.optionLabel = '';
    $scope.pendingCheckboxPosition = '';
  };

  $rootScope.$on('lineEndEvent', function() {
    $scope.pendingTextFieldPosition =
      'x: '+$rootScope.pendingOutline[0]+
      ', y: '+$rootScope.pendingOutline[1]+
      ', w: '+$rootScope.pendingOutline[2]+
      ', h: '+$rootScope.pendingOutline[3];
    $scope.pendingCheckboxPosition =
      'x: '+$rootScope.pendingOutline[0]+
      ', y: '+$rootScope.pendingOutline[1]+
      ', w: '+$rootScope.pendingOutline[2]+
      ', h: '+$rootScope.pendingOutline[3];
  });
  $rootScope.$on('rectEndEvent', function() {
    $scope.pendingCheckboxPosition =
      'x: '+$rootScope.pendingRect[0]+
      ', y: '+$rootScope.pendingRect[1]
  });

});

application.controller('TestPanelController', function($scope, $rootScope, $window, $uibModal) {
  $scope.window = $window;

  $scope.model = [];
  $scope.json = '';

  $scope.loadPDF = function(filename) {
    PDFJS.getDocument(filename).then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        var pixelWidth = document.getElementById('pdf-container').clientWidth;
        var viewport = page.getViewport(1);
        var scale = pixelWidth / viewport.width;
        var viewport = page.getViewport(scale);

        var pdfCanvas = document.getElementById('pdf-canvas');
        var pdfContext = pdfCanvas.getContext('2d');
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        var overlayCanvas = document.getElementById('overlay-canvas');
        var overlayContext = overlayCanvas.getContext('2d');
        overlayCanvas.height = viewport.height;
        overlayCanvas.width = viewport.width;

        var renderContext = {
          canvasContext: pdfContext,
          viewport: viewport
        };
        page.render(renderContext);
        $scope.model.push({
          viewportWidthPX: viewport.width,
          viewportHeightPX: viewport.height
        });
        $scope.updateModel();
      });
    });
  };

  var modalInstance = $uibModal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'fileSelectModal.html',
    controller: 'FileSelectModalController'
  });

  modalInstance.result.then(function (filenameInput) {
    $scope.loadPDF(filenameInput.valueOf());
    $scope.filename = '...'+filenameInput.substring(filenameInput.lastIndexOf('/'));
  });

  $scope.updateModel = function() {
    $scope.json = JSON.stringify($scope.model)
      .replace('},\s{','},\n\n{')
      .replace('[{','[\n{')
      .replace('}]','}\n]');
  };
  $scope.updateFromJSON = function() {
    $rootScope.completedOutlines = [];
    $rootScope.completedRects = [];
    $scope.model = JSON.parse($scope.json);
    for(var field in $scope.model) {
      console.log(field)
        if($scope.model[field].hasOwnProperty('label')) {
          $rootScope.completedOutlines.push({
            origin: [$scope.model[field].x, $scope.model[field].y],
            dim:  [$scope.model[field].w, $scope.model[field].h]
          });
        } else if($scope.model[field].hasOwnProperty('optionLabel')) {
          $rootScope.completedRects.push({
            origin: [$scope.model[field].x, $scope.model[field].y],
            dim:  [6,6]
          });
        }
    }
    console.log($rootScope.completedRects);
    $rootScope.render();
  }
});

application.controller('FileSelectModalController', function ($scope, $uibModalInstance) {
  //$scope.filenameInput = 'templates/form.pdf'
  $scope.loadFile = function () {
    $uibModalInstance.close($scope.filenameInput);
  };
});



application.controller('CanvasController', function($scope, $rootScope) {
  var overlayCanvas = document.getElementById('overlay-canvas');
  var context = overlayCanvas.getContext('2d');

  var drawingOutline = false;
  var drawingRect = false;
  var activeOutline = {
    origin: [0, 0],
    dim: [0 ,0]
  };
  var activeRect = {
    origin: [0, 0],
    dim: [10, 10]
  };

  $rootScope.completedOutlines = [];
  $rootScope.completedRects = [];

  function render() {
    context.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    renderOutlines();
    renderRects();
  }
  function renderOutlines() {
    for(var i=0; i<$rootScope.completedOutlines.length; i++) {
      var l = $rootScope.completedOutlines[i];
      context.beginPath();
      context.strokeStyle = 'rgb(31, 129, 164)';
      context.rect(l.origin[0],l.origin[1],l.dim[0],l.dim[1]);
      context.stroke();
    }
  }
  function renderRects() {
    for(var i=0; i<$rootScope.completedRects.length; i++) {
      var r = $rootScope.completedRects[i];
      context.fillStyle = 'rgb(31, 129, 164)';
      context.fillRect(r.origin[0], r.origin[1], r.dim[0], r.dim[1]);
    }

  }

  $scope.update = function(event) {
    if($rootScope.outlineDrawingAllowed && drawingOutline) {
      $scope.updateOutline(event);
    } else if($rootScope.rectDrawingAllowed && drawingRect) {
      $scope.updateRect(event);
    }
  };
  $scope.updateOutline = function(event) {
    render();
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(96, 192, 227)';
    context.rect(activeOutline.origin[0],activeOutline.origin[1],event.pageX-30 - activeOutline.origin[0],event.pageY-30 - activeOutline.origin[1]);
    context.stroke();
  };
  $scope.updateRect = function(event) {
    render();
    context.fillStyle = 'rgb(96, 192, 227)';
    activeRect.origin[0] = event.pageX-30;
    activeRect.origin[1] = event.pageY-30;
    context.fillRect(activeRect.origin[0], activeRect.origin[1], activeRect.dim[0], activeRect.dim[1]);
  };

  $scope.start = function(event) {
    if($rootScope.outlineDrawingAllowed && !drawingOutline) {
      $scope.startOutline(event);
    } else if($rootScope.rectDrawingAllowed&& !drawingRect) {
      $scope.startRect(event);
    }
  };
  $scope.startOutline = function(event) {
    drawingOutline = true;
    activeOutline.origin[0] = event.pageX-30;
    activeOutline.origin[1] = event.pageY-30;
    activeOutline.dim[0] = 0;
    activeOutline.dim[1] = 0;
    render();
  };
  $scope.startRect = function(event) {
    drawingRect = true;
    activeRect.origin[0] = event.pageX-30;
    activeRect.origin[1] = event.pageY-30;
    render();
  };

  $scope.end = function(event) {
    if($rootScope.outlineDrawingAllowed) {
      $scope.endOutline(event);
    } else if($rootScope.rectDrawingAllowed) {
      $scope.endRect(event);
    }
  };
  $scope.endOutline = function(event) {
    drawingOutline = false;
    activeOutline.dim[0] = event.pageX-30 - activeOutline.origin[0];
    activeOutline.dim[1] = event.pageY-30 - activeOutline.origin[1];

    $rootScope.pendingOutline = [activeOutline.origin[0],activeOutline.origin[1],activeOutline.dim[0],activeOutline.dim[1]];
    $rootScope.$broadcast('lineEndEvent');
  };
  $scope.endRect = function(event) {
    drawingRect = false;
    $rootScope.pendingRect = [activeRect.origin[0],activeRect.origin[1],activeRect.dim[0],activeRect.dim[1]];
    $rootScope.$broadcast('rectEndEvent');
  };

  $rootScope.saveOutline= function() {
    $rootScope.completedOutlines.push({
      origin: [activeOutline.origin[0], activeOutline.origin[1]],
      dim:  [activeOutline.dim[0], activeOutline.dim[1]]
    });
    render();
  };
  $rootScope.saveRect = function() {
    $rootScope.completedRects.push({
      origin: [activeRect.origin[0], activeRect.origin[1]],
      dim:  [activeRect.dim[0], activeRect.dim[1]]
    });
    console.log($rootScope.completedRects);
    render();
  };
  $rootScope.render = function() {
    render();
  };
});
