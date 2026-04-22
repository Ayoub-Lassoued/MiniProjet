import { Pipe, PipeTransform } from '@angular/core';
import { Telephone } from './model/telephone.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: Telephone[], filterText: string): Telephone[] {
    if (!list) return [];
    if (!filterText) return list;

    filterText = filterText.toLowerCase();

    return list.filter(item =>
      item.nomTel?.toLowerCase().includes(filterText)
    );
  }
}
