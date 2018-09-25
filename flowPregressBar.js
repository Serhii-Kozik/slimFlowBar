
/**
 * The widget provides an ability to add a custom progress bar to the flow
 * The Bar acts as simple widget.
 * THe Bar is customizeble and you can set any number of steps
 * and stylize each instance individualy.
 * Parameters:
 *  1- parent ID - null the widget Abstract needs this.
 *  2- unique identifyer the widget Abstract needs this.
 *  3- progressSteps - object contains step keys and step labels
 *     example
 *             progressSteps= {
 *                             "name": "name",
 *                             "dob": "date of birth",
 *                             "address": "address",
 *                             "gender": "gender",
 *                             "terms": "terms & conditions"
 *                             };
 *
 *  4- barName - string (no spaces) contains name for the instance of the progress bar,
 *     needed to be able to apply individual styling.
 *
 * To iniciate a new Bar instance in the flow file use following code:
 *===============================================================
 *      //THE FLOW PROGRESS BAR INITIALIZATION
 *
 *           let flowXXXProgressSteps = {
 *           "name": "name",
 *           "dob": "date of birth",
 *           "address": "address",
 *           "gender": "gender",
 *           "terms": "terms & conditions"
 *       };
 *
 *       var flowProgressBar = new FlowProgressBar(null,'flowXXX-progress-bar',flowXXXProgressSteps,'flow-XXX-bar');
 *================================================================
 *  XXX change to the flow number
 *
 * To set up the progress steps and to link the slides to the steps - add following code
 * to the onready setting of desired slide.
 *
 *         onready: function(){
 *
 *                   //Inaert Flow progress bar to the slide page
 *
 *                   flowProgressBar.addProgressBarToPage(App.Controller.current_page.container);
 *                   flowProgressBar.setActiveStep('--STEP-KEY--');
 *
 *                   //==========================================
 *
 *               },
 *
 * replase --STEP-KEY-- with desired step key.
 *
 * For individual styling - use barName as parent selector style like
 * .barName .anyElenentClass
 * I this case the styles will apply only to the progress bar with the 'name'.
 *
 */
function FlowProgressBar(parent, id, progressSteps={"stepone": "STEP One","steptwo": "STEP TWO"}, barName='')
{

    var activeStep;
    this.constructor = function()
    {
        var root    = document.createElement('DIV');
        /** check if steps for progress bar are provided */
        if (progressSteps !=={}) {
        /** create DOM elements for each step and apply classes*/
            Object.keys(progressSteps).map(function(value, key) {

                let stepContainer       = document.createElement('div');
                let stepContainerText   = document.createElement('span');
                let setepTitle          = document.createTextNode(progressSteps[value]);
                const activeClass       = activeStep === value ?'flow-active-step': '';

                stepContainer.id        = 'flow-progress-step-' + value;
                stepContainerText.id    ='flow-progress-step-text-' + value;
                stepContainer.className = 'flow-progress-item item-' + value;

                stepContainerText.appendChild(setepTitle);
                stepContainer.appendChild(stepContainerText);
                root.appendChild(stepContainer);
            });
        };

        root.className      = barName + ' flow-progress-bar';
        root.style.display  = 'flex';

        this.root = root;
        return root;
    };


    /**
     *Checks if progress bar exists inside the page container and inserts if not.
     *@param {[element]} pageContainer - container element of the slide page.
     */
    this.addProgressBarToPage = function(pageContainer){

        //Check if provided "pageContainer" is valid element and return if not.
        if (!pageContainer && !pageContainer.nodeType) return;

        //Check if "pageContainer" already contains progress bar and return if so, or
        if (pageContainer.querySelector('.flow-progress-bar')) return;
        //insert the progress bar to the "pageContainer" if not.
        pageContainer.insertBefore(this.root, pageContainer.firstChild);

        //Add the with-flow-progress-bar class to the body to be able to edit styles only for page with the bar
        document.body.classList.add('with-flow-progress-bar');

        //Add observer to remove the progress bar when slide is closed to avoid progress bar to be shown in other flows
        App.Controller.addObserver('close_page', function(){
            //check if the Bar is in the DOM ? If not - return,
            if (pageContainer.getElementsByClassName('flow-progress-bar').length === 0) return ;

            //if is present - remove the Bar from the "pageContainer"
            pageContainer.getElementsByClassName('flow-progress-bar')[0].remove();
            //remove the bar class from the body
            document.body.classList.remove('with-flow-progress-bar');
        });
    };

    /**
     *Sets the Progress step with provided id to active
     *@param {[string]} stepKey - key value of the step in steps object set during the bar initialization
     *
     */
    this.setActiveStep = function(stepKey){

        //remove the "active-step" class if exists for any item
        let currActiveStep = this.root.getElementsByClassName('flow-active-step');

        if (currActiveStep.length) {

            currActiveStep[0].classList.remove('flow-active-step');
        };

        //add the "active-step" class to provided "stepKey" item
        const stepId = '#flow-progress-step-' + stepKey;
        let newActiveStep = this.root.querySelector(stepId);
        newActiveStep.classList.add('flow-active-step');
    };

    this._super = WidgetAbstract;
    this._super(parent, id);
}
