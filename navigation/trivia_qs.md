---
layout: post 
title: Trivia Questions
search_exclude: true
permalink: /trivia/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivia Questions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fce4ec;
            text-align: center;
        }
        .heart-container {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 20px;
        }
        .heart {
            font-size: 50px;
            cursor: pointer;
            transition: transform 0.3s, color 0.3s;
        }
        .heart:hover {
            transform: scale(1.2);
        }
        .heart.broken {
            color: red;
            transform: scale(1.2);
        }
        .quiz-container {
            display: none;
            padding: 20px;
            border-radius: 15px;
            background: #d81b60;
            width: 80%;
            max-width: 400px;
            margin: 20px auto;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            color: white;
        }
        .question { margin-bottom: 15px; }
        .answer-feedback { font-weight: bold; margin-top: 5px; }
        .correct { color: green; }
        .incorrect { color: red; }
        h2 {
            color: white;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
            margin-bottom: 10px;
        }
        label {
            display: block;
            text-align: left;
            margin: 5px 0;
        }
        button {
            background-color: white;
            color: #d81b60;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        button:hover {
            background-color: #f8bbd0;
        }
    </style>
</head>
<body>
    <div class="heart-container">
        <span class="heart" onclick="breakHeart(0)">❤️</span>
        <span class="heart" onclick="breakHeart(1)">❤️</span>
        <span class="heart" onclick="breakHeart(2)">❤️</span>
    </div>
    
<div class="quiz-container" id="quiz">
        <h2>Quiz</h2>
        <div id="quiz-container"></div>
        <button onclick="submitQuiz()">Submit</button>
        <p id="score"></p>
 </div>

<script>
        let brokenHearts = 0;

        function breakHeart(index) {
            const hearts = document.querySelectorAll('.heart');
            if (!hearts[index].classList.contains('broken')) {
                hearts[index].textContent = '💔';
                hearts[index].classList.add('broken');
                brokenHearts++;
            }
            if (brokenHearts === 3) {
                document.getElementById('quiz').style.display = 'block';
            }
        }

        const questions = [
  { q: "What is the process of copying a DNA sequence into an RNA sequence called?", options: ["Translation", "Replication", "Transcription", "Splicing"], answer: "Transcription" },
  { q: "Which type of RNA carries genetic instructions from DNA to the ribosome?", options: ["tRNA", "mRNA", "rRNA", "snRNA"], answer: "mRNA" },
  { q: "Which enzyme is responsible for synthesizing RNA during transcription?", options: ["DNA polymerase", "RNA polymerase", "Helicase", "Ligase"], answer: "RNA polymerase" },
  { q: "What is the region of DNA where RNA polymerase binds to start transcription?", options: ["Terminator", "Promoter", "Exon", "Enhancer"], answer: "Promoter" },
  { q: "What are the coding regions of a gene called?", options: ["Introns", "Exons", "Promoters", "Operons"], answer: "Exons" },
  { q: "What is the role of tRNA in protein synthesis?", options: ["To carry genetic information", "To transfer amino acids to the ribosome", "To join DNA strands", "To modify mRNA"], answer: "To transfer amino acids to the ribosome" },
  { q: "What is the name of the process by which ribosomes create proteins from mRNA?", options: ["Transcription", "Translation", "Replication", "Splicing"], answer: "Translation" },
  { q: "What are the non-coding regions of a gene that are removed during RNA processing called?", options: ["Exons", "Promoters", "Introns", "Enhancers"], answer: "Introns" },
  { q: "Which structure in the cell is responsible for assembling proteins?", options: ["Nucleus", "Ribosome", "Golgi apparatus", "Lysosome"], answer: "Ribosome" },
  { q: "What is the role of a stop codon in translation?", options: ["It starts the process of protein synthesis.", "It signals the ribosome to stop protein synthesis.", "It adds an amino acid to the growing chain.", "It removes introns from mRNA."], answer: "It signals the ribosome to stop protein synthesis." },
  { q: "What type of bond forms between amino acids in a growing protein chain?", options: ["Hydrogen bond", "Peptide bond", "Ionic bond", "Covalent bond"], answer: "Peptide bond" },
  { q: "Which base is found in RNA but not in DNA?", options: ["Adenine", "Thymine", "Uracil", "Cytosine"], answer: "Uracil" },
  { q: "What does the 'central dogma' of molecular biology describe?", options: ["DNA replication only", "Protein folding", "The flow of genetic information from DNA to RNA to protein", "Cell division"], answer: "The flow of genetic information from DNA to RNA to protein" },
  { q: "What molecule provides energy for the addition of amino acids during translation?", options: ["ATP", "GTP", "NADH", "ADP"], answer: "GTP" },
  { q: "What type of mutation results in no change to the amino acid sequence of a protein?", options: ["Missense mutation", "Nonsense mutation", "Silent mutation", "Frameshift mutation"], answer: "Silent mutation" },
  { q: "What is the function of a start codon in translation?", options: ["It ends protein synthesis.", "It signals where transcription begins.", "It signals where translation begins.", "It removes introns from RNA."], answer: "It signals where translation begins." },
  { q: "What is the sugar found in RNA?", options: ["Deoxyribose", "Glucose", "Ribose", "Fructose"], answer: "Ribose" },
  { q: "Which type of RNA makes up the structural and functional components of ribosomes?", options: ["mRNA", "tRNA", "rRNA", "snRNA"], answer: "rRNA" },
  { q: "What is the role of the poly-A tail added to eukaryotic mRNA?", options: ["To initiate transcription", "To protect mRNA from degradation", "To bind amino acids", "To splice introns"], answer: "To protect mRNA from degradation" },
  { q: "Which DNA sequence signals the end of transcription?", options: ["Promoter", "Operator", "Terminator", "Enhancer"], answer: "Terminator" },
  { q: "What are the building blocks of proteins?", options: ["Nucleotides", "Sugars", "Amino acids", "Lipids"], answer: "Amino acids" },
  { q: "What is the role of the ribosome during translation?", options: ["To transcribe DNA into RNA", "To assemble amino acids into a protein", "To replicate DNA", "To splice RNA"], answer: "To assemble amino acids into a protein" },
  { q: "What is the term for a group of three nucleotides on mRNA that codes for an amino acid?", options: ["Anticodon", "Codon", "Intron", "Exon"], answer: "Codon" },
  { q: "Which molecule pairs with codons on mRNA to ensure correct amino acid addition?", options: ["tRNA", "DNA", "rRNA", "snRNA"], answer: "tRNA" },
  { q: "Which of the following is NOT a nitrogenous base found in RNA?", options: ["Adenine", "Thymine", "Uracil", "Cytosine"], answer: "Thymine" },
  { q: "What does a frameshift mutation do?", options: ["Changes a single amino acid in a protein", "Shifts the reading frame of the genetic code", "Causes early termination of protein synthesis", "Removes an exon"], answer: "Shifts the reading frame of the genetic code" },
  { q: "Which process occurs in the nucleus of eukaryotic cells?", options: ["Translation", "Transcription", "Protein folding", "Codon recognition"], answer: "Transcription" },
  { q: "What happens during RNA splicing?", options: ["Introns are removed from RNA, and exons are joined together.", "RNA is converted into DNA.", "RNA is degraded.", "Ribosomes assemble on RNA."], answer: "Introns are removed from RNA, and exons are joined together." },
  { q: "What is the function of the 5' cap added to eukaryotic mRNA?", options: ["To start translation", "To protect mRNA from degradation", "To splice introns", "To recruit DNA polymerase"], answer: "To protect mRNA from degradation" },
  { q: "Which of the following is true about prokaryotic gene expression?", options: ["Transcription and translation occur in separate compartments.", "mRNA is processed before translation.", "Transcription and translation occur simultaneously.", "Introns are present in the genes."], answer: "Transcription and translation occur simultaneously." },
  { q: "What is the term for a sequence of DNA that codes for a protein?", options: ["Gene", "Chromosome", "Promoter", "Enhancer"], answer: "Gene" },
  { q: "What binds to the stop codon during translation to end protein synthesis?", options: ["tRNA with an amino acid", "Release factor", "RNA polymerase", "Spliceosome"], answer: "Release factor" },
  { q: "What is the difference between DNA and RNA?", options: ["RNA contains deoxyribose, while DNA contains ribose.", "DNA contains uracil, while RNA contains thymine.", "DNA is double-stranded, while RNA is single-stranded.", "DNA is found in the cytoplasm, while RNA is found in the nucleus."], answer: "DNA is double-stranded, while RNA is single-stranded." },
  { q: "What is the function of an operator in prokaryotic gene regulation?", options: ["It initiates transcription.", "It acts as a binding site for repressors.", "It terminates transcription.", "It splices RNA."], answer: "It acts as a binding site for repressors." },
  { q: "Which molecule is directly responsible for catalyzing peptide bond formation during translation?", options: ["rRNA in the ribosome", "tRNA", "mRNA", "RNA polymerase"], answer: "rRNA in the ribosome" },
  { q: "Which sequence determines where transcription begins on the DNA strand?", options: ["Stop codon", "Operator", "Start codon", "Promoter"], answer: "Promoter" },
  { q: "What is a polysome?", options: ["A group of ribosomes reading the same mRNA molecule", "A type of RNA molecule", "A structure used in DNA replication", "A gene cluster on the chromosome"], answer: "A group of ribosomes reading the same mRNA molecule" },
  { q: "What is the function of a transcription factor?", options: ["To synthesize DNA", "To regulate the initiation of transcription", "To process RNA", "To bind ribosomes to mRNA"], answer: "To regulate the initiation of transcription" },
  { q: "What happens when a gene is 'expressed'?", options: ["It is replicated.", "Its DNA sequence is transcribed and translated into a protein.", "It is deleted.", "It is stored in the nucleus."], answer: "Its DNA sequence is transcribed and translated into a protein." },
  { q: "What is the role of enhancers in eukaryotic gene expression?", options: ["To increase the rate of transcription", "To bind ribosomes to RNA", "To terminate translation", "To remove introns"], answer: "To increase the rate of transcription" },
  { q: "All human BODY CELLS contain this many chromosomes", options: ["23", "89", "46", "8"], answer: "46" },

        ];

        let selectedQuestions = [];

        function getRandomQuestions() {
            selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        }

        function loadQuiz() {
            getRandomQuestions();
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.innerHTML = "";
            selectedQuestions.forEach((question, index) => {
                let questionHTML = `<div class='question' id='q${index}'>
                    <p>${question.q}</p>`;
                question.options.forEach(option => {
                    questionHTML += `<label>
                        <input type='radio' name='q${index}' value='${option}'> ${option}
                    </label>`;
                });
                questionHTML += `<p class='answer-feedback' id='feedback${index}'></p></div>`;
                quizContainer.innerHTML += questionHTML;
            });
        }

        function submitQuiz() {
            let score = 0;
            selectedQuestions.forEach((question, index) => {
                const selectedOption = document.querySelector(`input[name='q${index}']:checked`);
                const feedback = document.getElementById(`feedback${index}`);
                feedback.classList.remove("correct", "incorrect");
                if (selectedOption) {
                    if (selectedOption.value === question.answer) {
                        score++;
                        feedback.innerHTML = "<span class='correct'>Correct!</span>";
                    } else {
                        feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${question.answer}</span>`;
                    }
                } else {
                    feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${question.answer}</span>`;
                }
            });
            document.getElementById("score").textContent = `Your score: ${score}/5`;
        }

        loadQuiz();
</script>
</body>
</html>
