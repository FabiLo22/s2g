import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/global/services/api.service';


@Component({
  selector: 'app-battle-reports-list',
  templateUrl: './battle-reports-list.component.html',
  styleUrls: ['./battle-reports-list.component.scss']
})
export class BattleReportsListComponent {
  public isInputActive: boolean = false;

  public battleReports: any = null;

  constructor(public router: Router, private api: ApiService) {
    this.getBattleReports();
  }

  async getBattleReports() {
    this.battleReports = await firstValueFrom(this.api.get('/battlereports'));
    console.log(this.battleReports);
  }

  async createBattleReport() {
    const battleReport: any = await firstValueFrom(this.api.put('/battlereports', {}));
    this.router.navigateByUrl('admin/battlereports/edit/' + battleReport._id);
  }

  async deleteBattleReport(battleReport) {
    this.api.delete('/battlereports/' + battleReport._id).subscribe(res => {
      const index = this.battleReports.indexOf(battleReport);
      this.battleReports.splice(index, 1);
    });
  }
}
