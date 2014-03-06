 public function GetBodyAtMouse(includeStatic:Boolean=false):b2Body {
    real_x_mouse = (stage.mouseX)/pixels_in_a_meter;
    real_y_mouse = (stage.mouseY)/pixels_in_a_meter;
    mousePVec.Set(real_x_mouse, real_y_mouse);
    var aabb:b2AABB = new b2AABB();
    aabb.lowerBound.Set(real_x_mouse - 0.001, real_y_mouse - 0.001);
    aabb.upperBound.Set(real_x_mouse + 0.001, real_y_mouse + 0.001);
    var k_maxCount:int = 10;
    var shapes:Array = new Array();
    var count:int = m_world.Query(aabb, shapes, k_maxCount);
    var body:b2Body = null;
    for (var i:int = 0; i < count; ++i) {
        if (shapes[i].m_body.IsStatic() == false || includeStatic) {
            var tShape:b2Shape = shapes[i] as b2Shape;
            var inside:Boolean = tShape.TestPoint(tShape.m_body.GetXForm(), mousePVec);
            if (inside) {
                body = tShape.m_body;
                break;
            }
        }
    }
    return body;
}