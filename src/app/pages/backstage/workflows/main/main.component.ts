import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../data/workflow.service';
import { WorkflowDTO } from '../data/workflow.dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  workflows: WorkflowDTO[] = [];
  loading = true;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.workflowService.getAllWorkflows().subscribe({
      next: (data) => {
        this.workflows = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
