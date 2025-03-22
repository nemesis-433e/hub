import os
import re
from pathlib import Path

def process_html_files(directory='.'):
    # Obter todos os arquivos HTML na pasta atual
    html_files = list(Path(directory).glob('*.html'))
    
    for html_file in html_files:
        print(f"Processando: {html_file}")
        
        # Ler o conteúdo do arquivo HTML
        with open(html_file, 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        # Usar regex para encontrar todos os elementos <a>
        a_tags = re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', html_content)
        
        if not a_tags:
            print(f"Nenhum elemento <a> encontrado em {html_file}. Pulando.")
            continue
        
        # Criar o conteúdo do arquivo JS
        js_content = 'const fonte = "";\n'
        js_content += 'module.exports = [\n'
        
        for href, inner_html in a_tags:
            js_content += f'    ["{inner_html}", "{href}"],\n'
        
        # Remover a última vírgula e fechar o array
        js_content = js_content.rstrip(',\n') + '\n'
        js_content += '].map(item => [...item, fonte]);  // Adiciona "fonte" automaticamente'
        
        # Criar o nome do arquivo JS (mesmo nome do HTML, mas com extensão .js)
        js_filename = html_file.with_suffix('.js')
        
        # Escrever o conteúdo no arquivo JS
        with open(js_filename, 'w', encoding='utf-8') as file:
            file.write(js_content)
        
        print(f"Arquivo criado: {js_filename}")

if __name__ == "__main__":
    print("Iniciando o processamento de arquivos HTML para JS...")
    process_html_files()
    print("Processamento concluído!")