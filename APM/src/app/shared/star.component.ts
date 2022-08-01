import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})
export class StarComponent implements OnChanges{
    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = this.rating * 75/5;
    }
    @Input() rating:number = 4;
    cropWidth:number | undefined ;

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onClick(){
        console.log('Emitting message from child..');
        
        this.notify.emit(`${this.rating} Clicked!`);
    }

}