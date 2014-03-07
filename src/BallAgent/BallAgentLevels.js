angular.module('BallAgent')
.service('BallAgentLevels',function(){
	this.levels = [
		{
			lWall:true,
			rWall:true,
			floor:true
		},
		{
			lWall:true,
			rWall:true,
			floor:true,
      exit:{
        y:12,
        x:4
      },
      platforms:[
        {
          x: 4,
          y: 13,
          width: 2
        },
        {
          x: 17,
          y: 15,
          width: 2
        }
      ]
		},
		{
      // level 3
      lWall:true,
      rWall:true,
      floor:true,
      exit:{
        y:9 ,
        x:17
      },
      platforms:[
        {
          x: 4,
          y: 13,
          width: 2.5
        },
        {
          x: 17,
          y: 15,
          width: 2
        },
        {
          x: 17,
          y: 11,
          width: 2
        }
      ]
    },
    {
      // level 4
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:10,
        x:17
      },
      platforms:[
        {
          x: 3,
          y: 13,
          width: 2
        },
        {
          x: 10,
          y: 12,
          width: 2
        },
        {
          x: 17,
          y: 11,
          width: 2
        }
      ]
    },
    {
      // level 5
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:9,
        x:20
      },
      platforms:[
        {
          x: 3,
          y: 13,
          width: 1.8
        },
        {
          x: 9,
          y: 12,
          width: 1.8
        },
        {
          x: 14,
          y: 11,
          width: 1.8
        },
        {
          x: 20,
          y: 10,
          width: 2.3
        }
      ]
    },
    {
      // level 6
      lWall:true,
      rWall:false,
      floor:false,
      exit:{
        y:9.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 11,
          width: 2.1
        },
        
      ]
    },
    {
      // level 7
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:9.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 4,
          width: 2.1
        },
        {
          x: 19,
          y: 7,
          width: 1.5
        },
        {
          x: 12,
          y: 11,
          width: 2
        },
        
      ]
    },
    {
      // level 8
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:11.3,
        x:19
      },
      platforms:[
        {
          x: 2.5,
          y: 4,
          width: 2.1
        },
        
        
      ]
    },
    {
      // level 9
      lWall:false,
      rWall:false,
      floor:false,
      exit:{
        y:12,
        x:20
      },
      platforms:[
        {
          x: 2,
          y: 15,
          width: 1.2
        },
        {
          x: 7,
          y: 13,
          width: 1.2
        },
        {
          x: 12,
          y: 11,
          width: 1.2
        },
        {
          x: 17,
          y: 9,
          width: 1.2
        },
        
        
      ]
    },
    {
      // level 10
      lWall:true,
      rWall:true,
      floor:true,
      exit:{
        y:12,
        x:20
      },
      platforms:[
        {
          x: 2,
          y: 15,
          width: 1.2
        },    
       ],
      columns:[
        {
          x: 10,
          y: 15,
          width: 0.3,
          height: 10,
          friction: 25,
        }
      ]      
     },
     {
       // level 11
       lWall:true,
       rWall:false,
       floor:false,
       exit:{
         y:10,
         x:20
       },
       platforms:[
         {
           x: 2,
           y: 15,
           width: 2
         },    
        ],
       columns:[
         {
           x: 10,
           y: 15,
           width: 0.3,
           height: 9,
           friction: 25,
         }
       ]      
      },
      {
        // level 12
        lWall:false,
        rWall:false,
        floor:false,
        exit:{
          y:4,
          x:18
        },
        platforms:[
          {
            x: 2,
            y: 15,
            width: 2
          },    
         ],
        columns:[
          {
            x: 10,
            y: 15,
            width: 0.3,
            height: 3,
            friction: 25,
          },
          {
            x: 15,
            y: 8,
            width: 0.3,
            height: 3,
            friction: 25,
          }
        ]      
       },
       {
         // level 13
         lWall:false,
         rWall:false,
         floor:false,
         exit:{
           y:3,
           x:20
         },
         platforms:[
           {
             x: 2,
             y: 15,
             width: 2
           },    
           {
             x: 12,
             y: 10,
             width: 3
           },    
          ],
         columns:[
           {
             x: 8,
             y: 15,
             width: 0.3,
             height: 3,
             friction: 25,
           },
           {
             x: 17,
             y: 6,
             width: 0.3,
             height: 3,
             friction: 25,
           }
         ]      
        },
     {
       // level 14
       lWall:true,
       rWall:true,
       floor:true,
       exit:{
         y:3,
         x:20
       },
       columns:[
         {
           x: 8,
           y: 12,
           width: 0.3,
           height: 3,
           friction: 25,
           moves:true,
           movement: {
             shiftY:1,
             shiftX:0,
             period:2,
           }
         },
       ],
       platforms:[
         {
           x: 8,
           y: 12,
           width: 2,
           height: 0.2,
           friction: 40,
           moves:true,
           movement: {
            shiftY:0,
            shiftX:1,
            period:2,
          }
         },
       ]       
      }
	]
})