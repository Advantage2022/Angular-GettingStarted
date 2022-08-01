import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "convertToSpace"
})
export class ConvertToSpace implements PipeTransform{
    transform(value: string, character:string) {
        return value.replace(character, ' ');
    }

}