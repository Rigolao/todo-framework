import {Toaster} from "@/components/ui/sonner";
import {ToDoAccordion} from "@/components/custom/to-do-accordion";
import {Button} from "@/components/ui/button";
import {CategoryDialog} from "@/components/custom/category-dialog";
import {ToDoDialog} from "@/components/custom/to-do-dialog";
import {useAppContext} from "@/contexts/app-context";
import {useGet} from "@/hooks/use-get";
import {Category} from "@/types/category";
import {URL_API} from "@/constants";

export default function App() {
    const {
        toDoSelected, setToDoSelected,
        categorySelected, setCategorySelected,
        isToDoDialogOpen, setToDoDialogOpen,
        isCategoryDialogOpen, setCategoryDialogOpen
    } = useAppContext();

    const {data, error} = useGet<Category[]>({
        queryKey: ['categorias'],
        url: `${URL_API}/tarefa/agrupas-por-categoria`,
        onSuccess: (data) => console.log(data),
        onFailure: (err) => console.log(err)
    });

    const handleCategoryDialogOpen = () => {
        setCategoryDialogOpen(true);
    }

    const handleCategoryDialogClose = () => {
        setCategorySelected(undefined);
        setCategoryDialogOpen(false);
    };

    const handleToDoDialogClose = () => {
        setToDoSelected(undefined);
        setCategorySelected(undefined);
        setToDoDialogOpen(false);
    };

    return (
        <div>
            <Toaster position="bottom-left" richColors closeButton />
            {error ? (
                <div>Erro ao carregar dados!</div>
            ) : (
                <ToDoAccordion categorias={data} />
            )}
            <div className='fixed flex items-end p-8 bottom-0 right-0'>
                <Button
                    variant={'default'}
                    onClick={handleCategoryDialogOpen}
                    className=''>
                    Adicionar Categoria
                </Button>
            </div>
            <CategoryDialog
                category={categorySelected}
                isOpen={isCategoryDialogOpen}
                onClose={handleCategoryDialogClose} />
            <ToDoDialog
                toDo={toDoSelected}
                category={categorySelected}
                isOpen={isToDoDialogOpen}
                onClose={handleToDoDialogClose} />
        </div>
    );
}