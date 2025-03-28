import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TagService} from '../data/tag.service';


export interface TagDTO {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less']
})
export class TagComponent implements OnInit {
  tags: TagDTO[] = [];
  isLoading = false;

  isModalVisible = false;
  isEditMode = false;
  currentTag: Partial<TagDTO> = { name: '' };

  constructor(
    private tagService: TagService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.isLoading = true;
    this.tagService.getAll().subscribe({
      next: (res) => {
        this.tags = res;
        this.isLoading = false;
      },
      error: () => {
        this.message.error('Không thể tải danh sách tag');
        this.isLoading = false;
      }
    });
  }

  showCreateModal(): void {
    this.isEditMode = false;
    this.currentTag = { name: '' };
    this.isModalVisible = true;
  }

  showEditModal(tag: TagDTO): void {
    this.isEditMode = true;
    this.currentTag = { ...tag };
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (!this.currentTag.name || this.currentTag.name.trim() === '') {
      this.message.warning('Tên tag không được để trống');
      return;
    }
    const action = this.isEditMode
      ? this.tagService.update(this.currentTag.id!, this.currentTag.name)
      : this.tagService.create(this.currentTag.name);

    action.subscribe({
      next: () => {
        this.message.success(this.isEditMode ? 'Cập nhật thành công' : 'Tạo mới thành công');
        this.isModalVisible = false;
        this.loadTags();
      },
      error: () => this.message.error('Thao tác thất bại')
    });
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  confirmDelete(tag: TagDTO): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xoá tag này?',
      nzContent: `Tag: ${tag.name}`,
      nzOkText: 'Xoá',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTag(tag.id)
    });
  }

  deleteTag(id: number): void {
    this.tagService.delete(id).subscribe({
      next: () => {
        this.message.success('Đã xoá tag');
        this.loadTags();
      },
      error: () => this.message.error('Xoá tag thất bại')
    });
  }
}
