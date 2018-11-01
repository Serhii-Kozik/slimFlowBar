# Progress Bar Animation #
## Progress Bar Animation implementation ##

ProgressBarAnimation allows illustrating steps of any flow to keep the user informed about the current step and total steps in the flow. 

You can have multiple implementations of the widget in one application. 
It has a nice arrow style and animation when the user switches between slides.


## What’s new ##
 
The widget consists of the widget function JS file and CSS styles file. 


ProgressBarAnimation_2.0.js (flowXXX/widget/ProgressBarAnimation_2.0.js)
ProgressBarAnimation_2.0.css (flowXXX/public/css-w/ProgressBarAnimation_2.0.css)


Widget function name  “ProgressBarAnimation”.
ProgressBarAnimation function accepts 4 arguments:


First:        (null)    parentId - needed for WidgetAbstract;
Second:  (string)  id of the instance;
Third:      (object) object with steps “id - name” pairs.’
Fourth:    (string)  “optional” name of the instance uses for individual styling.


ProgressBarAnimation has two methods: “addToSlide” and “setActiveStep”.


-  “addToSlide” method - checks if the "progress bar" exists on the page and will insert it if not. The method expects one parameter  - slide container.
We can get it from “App.Controller.current_page.container”


-  “setActiveStep” method - sets the "progress step" with provided id to active.


The widget inserts into a flow by initiating the widget instance inside the flow module.


Step is a “step id” - “step name” pair.
All steps are properties of an progress_steps object.
	
Slides could be assign to the step with (addToSlide) and (setActiveStep) methods.


The widget instance has a name, the name added to CSS class list of the widget container. So widget instance can be individually styled.
If the page contains the progress bar - ‘with-pba’ CSS class will be added to a body tag. So the entire page can be customized.

## What’s improved ##
According to the design provided in the task, an extra space should be added on top of each slide, if it contains Progress Bar Animation. This extra space will be added automatically if Progress Bar Animation is present on the page.

Before the implementation it was ProgressBar widget in the slim framework.
	ProgressBar widget has no documentation and it is unclear how to use the widget. 
	The widget shows checkboxes, it seems some css styles are missing.
	
So ProgressBar widget was renamed to ProgressBarNavigator_0.1 in :
core/widget/ProgressBarNavigator_0.1.js
flowXXX/widget/ProgressBarNavigator_0.1.js

## How to reuse Progress Bar Animation in 3 steps ##
Make sure that the “Progress Bar Animation” files are in place.

	flowXXX/widget/ProgressBarAnimation_2.0.js
 flowXXX/public/css-w/ProgressBarAnimation_2.0.css

Define the progress steps and initiate the widget inside your flow module.
	Example below shows initialization process in the registration flow    
(flowXXX/module/registration.js)

/** Define progress steps*/
let flowXXXProgressSteps = {
            "name"   : "name",
            "dob"    : "date of birth",
            "address": "address",
            "gender" : "gender",
            "terms"  : "terms & conditions"
        };
/** initiate new instance of ProgressBarAnimation widget*/
var progressBarAnimation = new ProgressBarAnimation(
                           Null,
                           'flow-xxx-progress-bar-animation', //id
                           flowXXXProgressSteps, //steps
                           'flow-xxx-bar' //name of instance      
                               );   

Assign flow slides to a progress steps by calling “addToSlide” and “setActiveStep” methods of ProgressBarAnimation instance inside “onready” statement of the slide. See example below.

onready: function(){
//Insert ProgressBarAnimation to the slide page
progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('step_id');
//==========================================
},


Change “step_id” to the actual "step id" defined in the flowXXXProgressSteps object. You can assign multiple slides to a single step.

The ProgressBarAnimation will appear in every slide that contains this methods calls. 

## Styling  ProgressBarAnimation_2.0 widget ##
The progress bar has default styles.
By default, the bar displays as flex container, and each item (step) is equal width.

To individually style the single "ProgressBarAnimation" instance you need to add/edit 
CSS code in the ProgressBarAnimation_2.0.css file in “flowXXX/public/css-w/” folder of the flow.

 Use instance name (fourth argument provided on initialization) as parent selector like

 .ProgressBarAnimationName .anyElementClass

 In this case, the styles will apply only to the progress bar with the name ProgressBarAnimationName.

.flow-xxx-bar .pba-progress-step.item-gender {
     z-index: 6;
}

Also, you can change any styles on the page, where the progress bar is present.

 	Use .with-pba as parent selector, like

  .with-pba .anyElementClass

.with-pba #sliderFrame > div {
    top: 38px!important;
}

In this case, styling will apply only  to the pages with "ProgressBarAnimation" widget;  

## Example of implementation ##
This example shows the integration of the "ProgressBarAnimation" widget to the registration flow.

Let’s open the registration flow file.









Now let’s initiate the widget instance for this flow by adding the following code at the top of the registration.js file.

//** ADD FLOW PROGRESS BAR */
let flow370ProgressSteps = {
            "name": "name",
            "dob": "date of birth",
            "address": "address",
            "gender": "gender",
            "terms": "terms & conditions"
        };
 var progressBarAnimation = new ProgressBarAnimation(null,'flow370-progress-bar-animation',flow370ProgressSteps,'flow-370-bar');       



Now we have our plugin initiated, let’s add the slides to the progress steps.

For the “NAME” step we will assign FirstName and LastName slides. 
For this, we should add the following code to the “onready” statement of each slide. 


//Insert Flow progress bar to the slide page
             progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('name');

//==========================================

For the DATE OF BIRTH, we will assign BirthDate slide by adding following code to the “onready” statement of the slide.

onready: function(){
//Insert Flow progress bar to the slide page               progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('dob');
//==========================================
},






For the “ADDRESS” step we will assign StreetName, StreetNrAndAddition, PostalCode, City' slides. 
For this, we should add the following code to the “onready” statement of each mentioned slide. 

                   
//Insert Flow progress bar to the slide page
progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('address');
//==========================================

For the “GENDER” we will assign “Gender” slide by adding the following code to the “onready” statement of the slide.

onready: function(){
//Insert Flow progress bar to the slide page
progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('gender');
//==========================================
},

For the “TERMS & CONDITIONS” step, we will assign TermsInfo and TermsAndConditions slides, by adding the following code to the “onready” statement of each slide. 

//Insert Flow progress bar to the slide page                progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('terms');
//==========================================

Now we have the ProgressBarAnimation integrated into our registration flow.

## Release steps (5 min guide) ##
	
 To release Progress Bar Animation widget to the Application, you need to follow the next steps.

Add widget files to the flow.
ProgressBarAnimation_2.0.js  file to your flowXXX/widget/ folder.
ProgressBarAnimation_2.0.css file flowXXX/public/css-w/ folder.


Define progress steps and initiate the widget in the flow module file.
	
/** Define progress steps*/
let flowXXXProgressSteps = {
            "name"   : "name",
            "dob"    : "date of birth",
            "address": "address",
            "gender" : "gender",
            "terms"  : "terms & conditions"
        };
/** initiate new instance of ProgressBarAnimation widget*/
var progressBarAnimation = new ProgressBarAnimation(
                           Null,
                           'flow-xxx-progress-bar-animation', //id
                           flowXXXProgressSteps, //steps
                           'flow-xxx-bar' //name of instance                                     );   

Assign slides to the defined steps by calling the widget methods addToSlide and setActiveStep inside the “onready” statement of the slide.


onready: function(){
//Insert ProgressBarAnimation to the slide page
progressBarAnimation.addToSlide(App.Controller.current_page.container);
progressBarAnimation.setActiveStep('step_id');
//==========================================
},

