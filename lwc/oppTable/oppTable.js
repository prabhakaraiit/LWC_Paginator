import { LightningElement, track, wire } from 'lwc';
import getOpps from '@salesforce/apex/OppTableContoller.getOpportunities';

const columns = [
    { label: 'Opportunity Name', fieldName: 'oppLink', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, tooltip: 'Go to detail page', target: '_blank' } },
    { label: 'Type', fieldName: 'Type', type: 'text' },
    { label: 'Stage', fieldName: 'StageName', type: 'text', },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', cellAttributes: { alignment: 'left' } },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date', typeAttributes: { timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' } },
];
export default class OppTable extends LightningElement {
    @track error;
    @track columns = columns;
    @track opps; //All opportunities available for data table    
    @track showTable = false; //Used to render table after we get the data from apex controller    
    @track recordsToDisplay = []; //Records to be displayed on the page
    @track rowNumberOffset; //Row number

    @wire(getOpps)
    wopps({ error, data }) {
        if (data) {
            let recs = [];
            for (let i = 0; i < data.length; i++) {
                let opp = {};
                opp.rowNumber = '' + (i + 1);
                opp.oppLink = '/' + data[i].Id;
                opp = Object.assign(opp, data[i]);
                recs.push(opp);
            }
            this.opps = recs;
            this.showTable = true;
        } else {
            this.error = error;
        }
    }
    //Capture the event fired from the paginator component
    handlePaginatorChange(event) {
        this.recordsToDisplay = event.detail;
        this.rowNumberOffset = this.recordsToDisplay[0].rowNumber - 1;
    }
}