import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import * as Highcharts from 'highcharts';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  highchartss = Highcharts;
  userOptions =
    {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: ' <span>TOTAL</span><br>24563 ',
        align: 'center',
        verticalAlign: 'middle',
        y: 15,
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#2e384d'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            
            enabled: false,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: 180,
          endAngle: -180,
          center: ['50%', '50%'],
          size: '100%'
        }
      },
      series: [{
        type: 'pie',
        labels: ['Mutual Fund','Smart Market','Gold'],
        innerSize: '50%',
        data: [10,20,30]
      }   
      ],
     
    };



  public data = [{
    name: 'Mutual Fund',
    data: [35, 15, 70, 60, 120, 40, 70, 55, 90]
  }, {
    name: 'Smart Deposit',
    data: [20, 40, 50, 25, 90, 5, 65, 25, 85]
  },
  {
    name: 'Gold',
    data: [10, 25, 20, 45, 20, 80, 25, 10, 70]
  }
  ];

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "line"
    },
    title: {
      text: " "
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: " "
      }
    },
    series: this.data
  };

  public dataset: any;
  orderId: any;
  pageSlice: any;
  currentpage: number = 8;
  prevpage: number = 8;
  len: any;


  constructor(private dashBoardService: DashboardService, private http: HttpClient) { }

  ngOnInit() {
    this.dashBoardService.getJSON().subscribe(res => {
      this.dataset = res.data.orders;
      this.len = this.dataset.length;
      this.dataset.map(res => {
        var id = res.order_id;
        this.orderId = id.split("-");
      })

      this.pageSlice = this.dataset.slice(0, 8);
    })

  }

  OnChangePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.pageSlice = this.dataset.slice(startIndex, endIndex)


    if (this.currentpage < this.dataset.length) {
      this.currentpage = this.currentpage + this.pageSlice.length;
    }
    // if(this.prevpage > this.pageSlice.length)
    // {
    //   this.prevpage =  this.prevpage - this.pageSlice.length;
    //   if(this.prevpage == this.pageSlice.length){
    //       this.key = false;
    //   }
    // }
  }

}
