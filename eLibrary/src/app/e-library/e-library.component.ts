import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-e-library",
  templateUrl: "./e-library.component.html",
  styleUrls: ["./e-library.component.css"]
})
export class ELibraryComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  num: number = 20;

  constructor() {}

  ngOnInit() {}
}
