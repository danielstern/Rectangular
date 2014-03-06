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
          y: 13,
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
	]
})