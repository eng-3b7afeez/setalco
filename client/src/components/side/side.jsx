import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Todos, Calculator } from "@/components";

const Side = () => {
  return (
    <div className="grid ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="linkButton">
            Utility
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[400px] sm:w-[540px] my-5">
          <Tabs defaultValue="calculator" className="w-full my-5">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="todo">Todo</TabsTrigger>
            </TabsList>
            <TabsContent value="calculator">
              <Calculator />
            </TabsContent>
            <TabsContent value="todo">
              <Todos />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Side;
