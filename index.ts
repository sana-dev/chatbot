import { Component } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent {
  question: string = '';
  secondQuestion: string = '';
  maxLength: number = 30; // Adjust this value as needed
  isGenerating: boolean = false;

  onInputChange(event: any): void {
    // Handle input change
  }

  onSendMessage(): void {
    // Handle send message
  }

  OnresetChat(): void {
    // Handle reset chat
  }

  OnstopGenerating(): void {
    // Handle stop generating
  }
}
