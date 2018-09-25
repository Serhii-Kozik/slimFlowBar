FLOW PROGRESS BAR
=================
Widget for custom slim framework, provides the ability to add the progress bar with certain steps to any flow.

IDEA
====
The idea - to build a reusable and flexible widget with the progress steps bar functionality. Which is easy to integrate and customize.

SOLUTION
========
The idea was implemented in flowProgressBar.js widget and flowProgressBar.css.
The widget instance has steps of the progress flow provided on initialization step.
The widget can be easily integrated into any flow.
The progress step can contain any number of flow slides, set up for each desired slide.
The widget instance has a name and can be individually styled.

HOW TO USE
==========
The widget files flowProgressBar.js and flowProgressBar.css should be placed in a desired flow folder in "widget" and "public/css-w" folders respectively.

To initiate a new Bar instance in the flow file follow next guide:

1. - define the progress steps you need by defining the variable:

           let flowXXXProgressSteps = {
           "name": "name",
           "dob": "date of birth",
           "address": "address",
           "gender": "gender",
           "terms": "terms & conditions"
       };
2. - initiate the progress bar instance

       var flowProgressBar = new FlowProgressBar(null,'flowXXX-progress-bar',flowXXXProgressSteps,'flow-XXX-bar');

       XXX change to the flow number

      Parameters description
      Parameters:
        param 1 - parent ID - null, the widget Abstract needs this.
        param 2 - unique identifier, the widget Abstract needs this.
        param 3 - progressSteps - object contains step keys and step labels
           example
                   progressSteps= {
                                  "name": "name",
                                   "dob": "date of birth",
                                   "address": "address",
                                   "gender": "gender",
                                   "terms": "terms & conditions"
                                   };

        param 4 - barName - string (no spaces) contains the name for the instance of the progress bar,
                  needed to be able to apply individual styling.

3. - Add the following code to the "onready" declaration of the flow slides you want to be included in the progress bar, the '--STEP-KEY--' you provide will set current slide to the step with the key.

onready: function(){
                   //Insert Flow progress bar to the slide page

                   flowProgressBar.addProgressBarToPage(App.Controller.current_page.container);
                   flowProgressBar.setActiveStep('--STEP-KEY--');

                   //==========================================
               },

 replace --STEP-KEY-- with desired step key.

 After this tree steps, your flow has "Flow Progress bar" integrated.

 STYLING
 ======
 To individually style the single "Flow Progress bar" instance you need to add CSS code to the flowProgressBar.css file.

 Use barName as parent selector style like

 .barName .anyElenentClass

 I this case the styles will apply only to the progress bar with the 'name'.
 Also, you can change any of the slide styles on the page, where the progress bar is present.

 Use .with-flow-progress-bar as parent selector, like

  .with-flow-progress-bar .anyElenentClass

In this case, styling will be applied to the pages with "Flow Progress bar" only;
