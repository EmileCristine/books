import { Livro } from "../componentes/Livro";
import estilos from './Lista.livros.module.css';
import { useState, useEffect } from 'react';

export function ListaLivros() {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [termoBusca, setTermoBusca] = useState(""); // Estado para o termo de busca

    // Função para buscar livros
    const buscarLivros = (termo) => {
        setLoading(true);
        setError(null);

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${termo}&maxResults=40`)
            .then(response => response.json())
            .then(dados => {
                console.log("Dados da API:", dados); // Verifique os dados no console
                if (dados.items) {
                    setLivros(dados.items);
                } else {
                    setError(new Error("Nenhum livro encontrado."));
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar livros:", error);
                setError(error);
                setLoading(false);
            });
    };

    // Busca inicial ao carregar a página
    useEffect(() => {
        buscarLivros("react"); // Busca inicial (opcional)
    }, []);

    // Função para lidar com a pesquisa
    const handlePesquisa = (event) => {
        event.preventDefault(); // Evita o recarregamento da página
        buscarLivros(termoBusca);
    };

    if (loading) {
        return <div className={estilos.loading}>Carregando livros...</div>;
    }

    if (error) {
        return <div className={estilos.error}>Erro ao carregar os livros: {error.message}</div>;
    }

    return (
        <main>
            {/* Barra de pesquisa */}
            <form onSubmit={handlePesquisa} className={estilos.barraPesquisa}>
                <input
                    type="text"
                    placeholder="Digite o nome do livro..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className={estilos.inputPesquisa}
                />
                <button type="submit" className={estilos.botaoPesquisa}>
                    Pesquisar
                </button>
            </form>

            {/* Lista de livros */}
            <div className={estilos.conteiner}>
                {livros.map((umLivro, index) => (
                    <Livro key={index} propsLivro={umLivro} />
                ))}
            </div>
        </main>
    );
}