package main

import (
	"github.com/astaxie/beego"
	"github.com/guilhermebotossi/glowing-tribble/controllers"
)

func main() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/property/add", &controllers.TaskController{}, "get:ListTasks;post:NewTask")
	beego.Router("/task/:id:int", &controllers.TaskController{}, "get:GetTask;put:UpdateTask")
	beego.Run()
}
