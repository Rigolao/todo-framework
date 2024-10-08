
import {Pencil1Icon, PlusIcon} from "@radix-ui/react-icons";
import React from "react";
import {Category} from "@/types/category";
import {useAppContext} from "@/contexts/app-context";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import ToDoCard from "@/components/custom/to-do-card";

interface ToDoCategoryItemProps {
    categoria: Category
}

export default function ToDoCategoryItem({categoria}: ToDoCategoryItemProps) {

    const tarefas = categoria.tarefas ?? [];

    const {
        setCategorySelected,
        setCategoryDialogOpen,
        setToDoDialogOpen
    } = useAppContext();

    const handleCategorySelected = (category: Category) => {
        setCategorySelected(category);

        setCategoryDialogOpen(true);
    }

    const handleToDoDialogOpen = () => {
        setCategorySelected(categoria);

        setToDoDialogOpen(true);
    }

    return (
        <AccordionItem value={categoria.id ? `${categoria.id}` : "item"}>
            <AccordionTrigger
            className='text-xl font-bold'>
                <div className='flex items-center gap-2'>
                    <p>{categoria.descricao}</p>
                    <Button
                        asChild
                        variant='ghost'
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleCategorySelected(categoria);
                        }}>
                        <span>
                            <Pencil1Icon/>
                        </span>
                    </Button>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div
                    key={categoria.id}
                    className='grid grid-cols-3 w-full h-full gap-4'>
                    {tarefas.length === 0
                        ? <Card
                            key={`button-${categoria.id}`}
                            className='flex flex-col items-center justify-center min-w-min min-h-36 p-4'>
                            <div>
                                <Button
                                    key={`button-${categoria.id}`}
                                    onClick={handleToDoDialogOpen}>
                                    <PlusIcon />
                                </Button>
                            </div>
                        </Card>
                        : tarefas.map((tarefa, index) => (
                            <React.Fragment key={tarefa.id}>
                                <ToDoCard
                                    key={`${categoria.descricao}-${tarefa.id}`}
                                    toDo={tarefa}
                                    category={categoria}/>
                                {index === tarefas.length - 1 && (
                                    <Card
                                        key={index}
                                        className='flex flex-col items-center justify-center min-w-min min-h-36 p-4'>
                                        <div>
                                            <Button
                                            onClick={handleToDoDialogOpen}>
                                                <PlusIcon />
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                            </React.Fragment>
                        ))
                    }
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}