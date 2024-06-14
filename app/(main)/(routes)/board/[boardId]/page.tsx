interface IBoardIdPageProps {
    params: {
      boardId: string;
    };
}

const BoardIdPage = async ({ params }: IBoardIdPageProps) => {
    return (
        <div>
            Board
        </div>
    )
}

export default BoardIdPage;