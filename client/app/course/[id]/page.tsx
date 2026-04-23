import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

const Page = async ({ params }: PageProps ) => {
    const { id } = await params;

    return (
        <div>
            <CourseDetailsPage  id={id}/>
        </div>
    )
}

export default Page;