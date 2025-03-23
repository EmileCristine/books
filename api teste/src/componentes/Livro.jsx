import estilos from './Livro.module.css';
import { Customizador } from './Customizador';

export function Livro({ propsLivro }) {
    const { volumeInfo } = propsLivro;

    return (
        <Customizador>
            <figure>
                {/* Imagem do livro */}
                <img
                    className={estilos.capa}
                    src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                    alt={`Capa do livro: ${volumeInfo.title}`}
                />

                {/* Título do livro */}
                <figcaption className={estilos.titulo}>
                    {volumeInfo.title}
                </figcaption>

                {/* Autores do livro */}
                <p className={estilos.autor}>
                    {volumeInfo.authors?.join(', ') || "Autor desconhecido"}
                </p>

                {/* Data de publicação */}
                <p className={estilos.ano}>
                    {volumeInfo.publishedDate || "Data desconhecida"}
                </p>
            </figure>
        </Customizador>
    );
}