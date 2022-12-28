import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import  { dummyData }   from "./data";
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface dummy {
  name: string;
  creation_date: Date;
  type: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  inputVal!:string;
  typeVal!:string;
  typeFilter: any = {
    1:'User',
    2:'Admin'
  }

  range = new FormGroup({
    start: new FormControl(null,[Validators.required]),
    end: new FormControl(null,[Validators.required]),
  });

  displayedColumns: string[] = ['name', 'creation_date', 'type'];
  dataSource = new MatTableDataSource(dummyData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(){

  }

  
  applyFilter(event: Event) : void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit():void {
    console.log(this.sort);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  clearSearch(input:HTMLInputElement) : void {
    input.value = '';
    this.dataSource.filter = '';
  }



  tableFilter():void{
    
    this.dataSource.data = dummyData;
    
    if(this.typeVal && this.range.valid){
     
      this.dataSource.data = this.dataSource.data.filter(e=> {
     return  e.type === Number(this.typeVal) && 
        e.creation_date.getTime() >= this.range.get('start')?.value.getTime() && 
        e.creation_date.getTime() <= this.range.get('end')?.value.getTime() 
      });

    }else if(this.range.valid){
      this.dataSource.data = this.dataSource.data.filter(e=> (
        e.creation_date.getTime() >= this.range.get('start')?.value.getTime() && 
           e.creation_date.getTime() <= this.range.get('end')?.value.getTime() ));
    }else if (this.typeVal)
    this.dataSource.data = this.dataSource.data.filter(e=> (e.type === Number(this.typeVal) ));

  }

  clearAll(input:HTMLInputElement):void{
    this.range.reset(); 
    this.clearSearch(input);
    this.typeVal = '';
    this.tableFilter()
  }

  openGithub():void{
    location.href='https://github.com/sohanpaliyal'
  }
}
