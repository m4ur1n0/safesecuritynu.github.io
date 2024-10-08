import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { articlesList } from "../articles/articles";

function extractStrings(arr) {
    let totalString = "";
    for (let str of arr) {
        totalString += str + ", ";
    }
    return totalString.substring(0, totalString.length - 2);
}

export default function ArticlesList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    function articleMatch(article) {
        if (searchTerm === "") {
            return true;
        }

        if (article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }

        for (let tag of article.tags) {
            if (tag.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    return (
        <>
            <div className="w-[full] flex justify-center mt-10 lg:mt-20">
                <form className="focus-within:ring-4 ring-violet-500 border-2 border-neutral-400 bg-neutral-900 rounded-full w-[70%] md:w-[50%] lg:w-[40%] flex gap-x-0" onSubmit={() => setSearchTerm(document.getElementById("searchBox").value)}>
                    <div className="cursor-pointer flex mx-2 h-10 w-10 bg-neutral-900 hover:text-violet-500 text-neutral-400 justify-center items-center rounded-full" onClick={() => setSearchTerm(document.getElementById("searchBox").value)}>
                        <Search />
                    </div>
                    <input type="text" id="searchBox" placeholder="Search articles by title or tags..." className="flex-grow outline-none bg-transparent text-neutral-400 placeholder-neutral-600 text-xl overflow-hidden" />
                </form>
            </div>

            <div id="articles" className="mx-auto flex flex-row justify-center lg:w-[90%] relative pb-10 border-b border-neutral-800"> 
                <div className="flex flex-wrap mt-10 gap-y-10 justify-evenly">
                    {articlesList.filter(articleMatch).map((article, index) => (
                        <div key={index} className="cursor-pointer w-full lg:w-[40%] mx-3 p-3 rounded-lg hover:bg-neutral-900" onClick={() => {window.scrollTo({ top: 0, left: 0, behavior: "instant" }); navigate(`./article/${article.linkString}`)}}>
                            <div className="flex">
                                <div className="flex ml-3 mr-6 mt-1 h-10 w-10 p-2 bg-neutral-900 text-[#6529A7] justify-center items-center rounded-full">
                                    {article.icon}
                                </div>
                                <div>
                                    <h5 className="mt-1 mb-3 text-xl">{article.title}</h5>
                                    <p className="text-md mb-3 text-neutral-400">{article.description}</p>
                                    <h5 className="mt-1 mb-2 text-md">Published: <span className="text-md p-2 text-neutral-400">{article.publishDate}</span></h5>
                                    <h5 className="mt-1 mb-2 text-md">Authors: <span className="text-md p-2 text-neutral-400">{extractStrings(article.authors)}</span></h5>
                                    {article.contributors && <h5 className="mt-1 mb-2 text-md">Contributors: <span className="text-md p-2 text-neutral-400">{extractStrings(article.contributors)}</span></h5>}
                                    <h5 className="mt-1 mb-2 text-md">Tags: <span className="text-md p-2 text-neutral-400">{extractStrings(article.tags)}</span></h5>
                                    <p className="cursor-pointer mx-1 mt-5 w-fit hover:bg-violet-950 rounded-full py-1 px-3 border-[1px] border-violet-400 hover:border-violet-500 text-violet-400 hover:text-violet-500">
                                        View &gt;
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
